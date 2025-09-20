const express = require('express');
const router = express.Router();

router.get('/employees', (req, res) => {
    res.json({ msg: 'Consulta para los empleados funcionando...' });
});

router.post('/employees', (req, res) => {
    res.json({ msg: 'Envío de datos de empleados funcionando...' });
});

router.patch('/employees', (req, res) => {
    res.json({ msg: 'Actualización de empleados funcionando...' });
});

router.delete('/employees', (req, res) => {
    res.json({ msg: 'Borrado de empleados funcionando...' });
});