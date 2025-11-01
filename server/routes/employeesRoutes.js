const express = require('express');
const router = express.Router();
const employeesController = require("../controllers/employeesController.js");

router.post('/verify-code', employeesController.checkAccessCode);

// Endpoints and routes for later if they will be required
router.post('/', (req, res) => {
    res.json({ msg: 'Envío de datos de empleados funcionando...' });
});

router.patch('/', (req, res) => {
    res.json({ msg: 'Actualización de empleados funcionando...' });
});

router.delete('/', (req, res) => {
    res.json({ msg: 'Borrado de empleados funcionando...' });
});

module.exports = router;