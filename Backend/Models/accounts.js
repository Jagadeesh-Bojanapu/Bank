const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    accountType: {
        type: String,
        required: true,
        enum: ['current', 'savings', 'investment','Loan','FD','RD']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
