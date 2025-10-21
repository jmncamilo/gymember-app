const pool = require("../db/connection.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody } = require("../utils/validators/validateField.js");

class AuthController {
    constructor() {
    }

    async validateCredentials(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'Body must not be empty...'
            });
        }

        // Validate body fields
        const validation = validateBody(req.body);
        if (!validation.isSuccess) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validation?.errors
            });
        }

        // Destructuring body request
        const { email, hash_pass } = req.body;

        // Start the database query
        try {
            const query = 'SELECT * FROM Gym_Dev_Accounts WHERE email = ?';
            const [result] = await pool.execute(query, [email]);

            if(result.length === 0) {
                return res.status(404).json({
                    message: 'Email is not registered...'
                });
            }

            // TODO: search password and compara hash
            console.log(hash_pass);

            // TODO: sign token

            // Just for testing
            return res.status(200).json({
                message: 'User found...',
                data: result
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Internal server error. Please try again later...',
                error: err?.message
            });
        }

    }
}

module.exports = new AuthController();

// Usaremos execute() con el pool