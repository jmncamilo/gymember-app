const isEmptyBody = require("../utils/validators/emptyBody");
const AuthModel = require("../models/authModel.js");

class MasterController {
    constructor() {
    }

    async newAccount(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...'
            });
        }

        // TODO: Add some extra validation later...
        const { gym_name, nit, plain_pass, email, role } = req.body;

        try {
            const result = await AuthModel.createNewUser(gym_name, nit, plain_pass, email, role);
            if (result === null) {
                return res.status(400).json({
                    message: 'Error al crear la cuenta. Por favor, inténtalo de nuevo...'
                });
            }

            return res.status(201).json({
                message: '¡La cuenta ha sido creada!',
                result: result
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err
            });
        }
    }

}

module.exports = new MasterController();