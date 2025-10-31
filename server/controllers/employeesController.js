const EmployeesModel = require("../models/employeesModel.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");


class EmployeesController {
    constructor() {
    }

    async checkAccessCode(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...',
                access: false
            });
        }

        // Validate that access code is a string with 6 digits and does not be falsy
        const { plain_access_code } = req.body;
        if (!plain_access_code || plain_access_code.length !== 6) {
            return res.status(400).json({
                message: 'El código enviado no cumple con el formato requerido...',
                access: false
            });
        }

        // Getting the validPayload provided by the auth middleware
        const validPayload = req.gym;

        // Start db process
        try {
            // Finding all users from the logged-in gym
            const allUsersGym = await EmployeesModel.getAllEmployees(validPayload.id);

            // TODO: empezar a construir la lógica del looping de esos usuarios encontrados, para encontrar (o no) el código de acceso recibido en el body

            // Si la respuesta es exitosa
            return res.status(200).json({
                message: '¡Acceso otorgado al empleado para navegar dentro de la aplicacion!',
                access: true
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                access: false,
                error: err?.message || err
            });
        }
    }

}

module.exports = new EmployeesController();