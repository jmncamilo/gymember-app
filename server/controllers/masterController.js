const isEmptyBody = require("../utils/validators/emptyBody");
const AuthModel = require("../models/authModel.js");

class MasterController {
    constructor() {
    }

    async newAccount(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'Body must not be empty...'
            });
        }

        // TODO: Add some extra validation later...
        const { gym_name, nit, plain_pass, email, role } = req.body;

        try {
            const result = await AuthModel.createNewUser(gym_name, nit, plain_pass, email, role);
            if (result === null) {
                return res.status(400).json({
                    message: 'Error creating the account. Try again...'
                });
            }

            return res.status(201).json({
                message: 'Account created successfully!',
                result: result
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Internal server error. Please try again later...',
                error: err?.message || err
            });
        }
    }

}

module.exports = new MasterController();