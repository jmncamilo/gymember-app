const express = require('express');
const router = express.Router();
const customersController = require("../controllers/customersController.js");

router.get('/', customersController.getAllCustomers);
router.get('/expired', customersController.getAllCustomersExpired);
router.get('/find/:nuip', customersController.getByNuip);
router.post('/enroll', customersController.atomicEnrollCustomer);
router.post('/transaction', customersController.atomicTransactionCustomer);
router.post('/renew/transaction', customersController.atomicRenewTransactionCustomer);
router.patch('/:id', customersController.atomicUpdateCustomerInfo);

module.exports = router;
