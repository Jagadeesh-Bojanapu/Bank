const Transaction=require('../Models/transaction')
const User=require('../Models/user')
const Account = require('../Models/accounts');

exports.allTransaction = async () => {
    try {
      const transactions = await Transaction.find(); // Get all transactions
      return transactions; // Return the list of transactions
    } catch (error) {
      throw new Error("All transactions showing aborted")
    }
  };

  exports.userTransaction = async (email) => {
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        throw new Error('User not found'); // Handle case when user does not exist
      }
  
      const userId = user._id; // Get user ID
      // Fetch transactions by user ID
      const transactions = await Transaction.find({ fromAccountId: userId });
      return transactions; 
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error; // Optionally re-throw error for handling by caller
    }
  };

exports.deposit = async (email, amount) => {
    if (amount <= 0) {
        throw new Error('Deposit amount must be positive');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const account = await Account.findOne({ user: user._id });
    if (!account) {
        throw new Error('Account not found');
    }

    const newTransaction = new Transaction({
        type: 'deposit',
        fromAccountId: user._id,
        toAccountId: user._id,
        amount,
    });

    try {
        await newTransaction.save();

        account.balance += amount;
        await account.save();

        return { account, transaction: newTransaction };
    } catch (error) {
        throw new Error("Error in depositing");
    }
};

exports.withdrawal = async (email, amount) => {
    if (amount <= 0) {
        throw new Error('Withdrawal amount must be positive');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const account = await Account.findOne({ user: user._id });
    if (!account) {
        throw new Error('Account not found');
    }

    if (account.balance < amount) {
        throw new Error('Insufficient funds');
    }

    const newTransaction = new Transaction({
        type: 'withdrawal',
        fromAccountId: user._id,
        toAccountId: null,
        amount,
    });

    try {
        await newTransaction.save();

        account.balance -= amount;  // Subtract the withdrawal amount from the balance
        await account.save();

        return { account, transaction: newTransaction };
    } catch (error) {
        throw new Error('Error in withdrawal of money')
    }
};