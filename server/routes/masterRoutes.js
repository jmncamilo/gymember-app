const express = require('express');
const masterController = require("../controllers/masterController.js");
const masterPermission = require("../middlewares/masterPermission.js");

const router = express.Router();

router.get('/token/access', masterController.checkAuth); // Helper to trigger auth middleware
router.post('/', masterPermission, masterController.newAccount); // masterPermission allows access to create an account
router.post('/create/employee', masterPermission, masterController.newEmployeeAccount); // masterPermission allows access to create an employee account

module.exports = router;