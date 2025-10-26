const express = require('express');
const masterController = require("../controllers/masterController.js");
const masterPermission = require("../middlewares/masterPermission.js");

const router = express.Router();

router.get('/token/access', masterController.checkAuth);
router.post('/', masterPermission, masterController.newAccount);

module.exports = router;