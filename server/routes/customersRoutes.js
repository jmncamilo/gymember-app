const express = require('express');
const router = express.Router();
const customersController = require("../controllers/customersController.js");

router.post('/enroll', customersController.atomicEnrollCustomer);
router.post('/transaction', customersController.atomicTransactionCustomer);
// TODO: agregar endpoint para renovar (/renew tipo post) y para consultar por nuip (/find/:nuip tipo get)

// GET initial example and test
router.get('/', (req, res) => {
    res.json({ msg: 'Obtener los datos de clientes funcionando...' });
});


module.exports = router;
