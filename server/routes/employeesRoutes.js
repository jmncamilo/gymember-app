const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: 'Consulta para los empleados funcionando...' });
});

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