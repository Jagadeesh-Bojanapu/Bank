
const Loan = require('../Models/loan');
const Account = require('../Models/accounts');

const calculateEMI = (amount, interestRate, tenureMonths) => {
    // Validate input parameters
    if (amount <= 0 || interestRate <= 0 || tenureMonths <= 0) {
        throw new Error('Invalid input parameters');
    }

    // Convert interest rate from percentage to decimal
    const monthlyInterestRate = interestRate / 100 / 12;

    // Calculate EMI using the formula
    const emi = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
        (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

    return emi;
};

const applyLoan = async (loanData) => {
    try {
        const { accountNumber, amount, interestRate, tenureMonths } = loanData;
        const emi = calculateEMI(amount, interestRate, tenureMonths);
        const loan = new Loan({ ...loanData, emi });
        return await loan.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserLoans = async (accountNumber) => {
    try {
        return await Loan.find({ accountNumber });
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    calculateEMI,
    applyLoan,
    getUserLoans
};