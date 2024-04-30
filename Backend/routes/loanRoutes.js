const express=require('express');
const { calculateLoanEMI, applyLoan, getUserLoans } = require('../Controllers/loanCOntroller');
const router=express.Router();

router.post('/cal-emi',calculateLoanEMI)
router.post('/applyloan',applyLoan)

router.get('/user/:id',getUserLoans)
module.exports=router