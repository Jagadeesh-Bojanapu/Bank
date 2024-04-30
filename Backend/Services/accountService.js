// accountService.js
const Account = require('../Models/accounts');
const User = require('../Models/user');

exports.createAccount = async (email, accountNumber, accountType) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const newAccount = new Account({
            accountNumber,
            accountType,
            user: user._id
        });
        await newAccount.save();
        user.accounts.push(newAccount._id);
        await user.save();
        return "Account created successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllAccounts = async () => {
    try {
        const accounts = await Account.find();
        return accounts;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAccountById = async (accountId) => {
    try {
        const account = await Account.findById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return account;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.toggleAccountStatus = async (accountId, isActive) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(accountId, { status: isActive ? 'active' : 'inactive' }, { new: true });
        if (!updatedAccount) {
            throw new Error("Account not found");
        }
        return isActive ? "Account activated successfully" : "Account deactivated successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};

