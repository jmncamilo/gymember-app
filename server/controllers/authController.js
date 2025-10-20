const pool = require("../db/connection.js");

class AuthController {
    constructor() {
    }

    validateCredentials(req, res) {
        //Method to handling auth verification through login view
        res.json({ msg: 'Message to testing api' });
    }
}

module.exports = new AuthController();