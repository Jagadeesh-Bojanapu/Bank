// accountController.js
const accountService = require('../Services/accountService');

exports.createAccount = async (req, res) => {
    const { accountNumber, accountType } = req.body;
    const email = req.user_email; 
    try {
        const result = await accountService.createAccount(email, accountNumber, accountType);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await accountService.getAllAccounts();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAccountById = async (req, res) => {
    const accountId = req.params.id;
    try {
        const account = await accountService.getAccountById(accountId);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleAccountStatus = async (req, res) => {
    const accountId = req.params.id;
    const isActive = req.body.isActive;
    try {
        const result = await accountService.toggleAccountStatus(accountId, isActive);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
