const express=require('express');
const { getAllAccounts,getAccountById, createAccount, toggleAccountStatus } = require('../Controllers/accountController');

const router=express.Router();


router.get('/accounts',getAllAccounts)
router.get('/account/:id',getAccountById)

router.post('/createaccount',createAccount)

router.patch('/accounts/:id/toggle-status',toggleAccountStatus)

module.exports=router;