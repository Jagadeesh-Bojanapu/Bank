const transactionService = require('../Services/transactionService');

exports.getAllTransactions = async (req, res) => {

    try {
        const transactions = await transactionService.allTransaction;
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.userTransaction = async(req,res)=>{
    const email = req.user_email;
    try {
        const transactions = await transactionService.userTransaction(email);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.deposit = async (req, res) => {
    
    const {amount } = req.body;

    try {
        const email = req.user_email;
        const { account, transaction } = await transactionService.deposit(email,amount);
        res.status(201).json({ message: 'Deposit successful', account, transaction });
    } catch (error) {
        console.error('Error depositing money:', error);
        res.status(500).json({ error: 'Failed to deposit money' });
    }
};

exports.withdrawal = async (req, res) => {
    const email = req.user_email;
    const { amount } = req.body;

    try {
        const { account, transaction } = await transactionService.withdrawal(email, amount);
        res.status(201).json({ message: 'Withdrawal successful', account, transaction });
    } catch (error) {
        console.error('Error withdrawing money:', error);
        res.status(500).json({ error: 'Failed to withdraw money' });
    }
};




