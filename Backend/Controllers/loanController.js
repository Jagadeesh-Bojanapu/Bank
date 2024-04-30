const LoanService = require('../Services/loanService');

exports.calculateLoanEMI = (req, res) => {
    const { amount, interestRate, tenureMonths } = req.body;

    try {
        // Call the calculateEMI function with the loan amount and other parameters
        const emi = LoanService.calculateEMI(amount, interestRate, tenureMonths);

        res.json({ emi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.applyLoan = async (req, res) => {
    try {
        const { accountNumber } = req.body;
        const { amount, interestRate, tenureMonths } = req.body;
        const emi = LoanService.calculateEMI(amount, interestRate, tenureMonths);

        await LoanService.applyLoan({ accountNumber, amount, interestRate, tenureMonths, emi });

        res.status(201).json({ message: 'Loan application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserLoans = async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        const loans = await LoanService.getUserLoans(accountNumber);
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
