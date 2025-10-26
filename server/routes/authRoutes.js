const express = require('express');
const authController = require("../controllers/authController.js");

const router = express.Router();

router.get('/token/refresh', authController.validateRefreshToken);
router.post('/', authController.validateCredentials);

// These routes are placeholders for future features, so controller methods should be added
router.get('/', (req, res) => {
    res.json({ msg: 'Consulta de credenciales funcionando...' });
});

router.patch('/', (req, res) => {
    res.json({ msg: 'Actualización de credenciales funcionando...' });
});

router.delete('/', (req, res) => {
    res.json({ msg: 'Borrado de credenciales funcionando...' });
});

module.exports = router;