const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
      return  next();
    }
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
      return  next();
    }
    catch(error){
      return  next(error);
    }
})

userSchema.methods.checkPassword =function(password,done){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        done(err,isMatch)
    })
}

const User = mongoose.model('User', userSchema);
module.exports = User;
