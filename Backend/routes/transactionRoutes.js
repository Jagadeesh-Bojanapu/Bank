const express = require('express');
const { getAllTransactions, deposit, withdrawal, userTransaction } = require('../Controllers/TransactionController');
const router = express.Router();


router.get('/transactions',getAllTransactions)
router.get('/transactions/user',userTransaction)
router.post('/deposit',deposit)
router.post('/withdrawal',withdrawal)


module.exports = router;