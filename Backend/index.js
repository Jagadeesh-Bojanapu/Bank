const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bank')
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(() => {
        console.log("Failed to connect MongoDB");
    });

app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true
}));

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const accountRoutes=require('./routes/accountRoutes')
const {authenticate } = require('./Middlewares/authMiddleware')

app.use('/api',authenticate ,accountRoutes )

const transactionRoutes =require('./routes/transactionRoutes')
app.use('/api',authenticate,transactionRoutes)

const loanRoutes=require('./routes/loanRoutes')
app.use('/loan',authenticate,loanRoutes)

const Port = 3000;
app.listen(Port, () => {
    console.log('Server is listening at port ' + Port);
});
