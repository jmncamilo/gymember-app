const express = require('express');
const router = express.Router();
const customersController = require("../controllers/customersController.js");

router.get('/find/:nuip', customersController.getByNuip);
router.post('/enroll', customersController.atomicEnrollCustomer);
router.post('/transaction', customersController.atomicTransactionCustomer);
// TODO: agregar endpoint para renovar (/renew tipo post)

// GET initial example and test
router.get('/', (req, res) => {
    res.json({ msg: 'Obtener los datos de clientes funcionando...' });
});


module.exports = router;
