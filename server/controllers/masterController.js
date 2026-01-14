const isEmptyBody = require("../utils/validators/emptyBody.js");
const AuthModel = require("../models/authModel.js");
const EmployeesModel = require("../models/employeesModel.js");
const { updateStatusForExpiredMemberships } = require("../models/customersModel.js");


class MasterController {
    constructor() {
    }

    async checkAuth(req, res) {
        return res.status(200).json({
            message: 'El token de acceso es válido...',
            access: true
        });
    }

    async newAccount(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...'
            });
        }

        // TODO: add validation for granting gym accounts once the dev-admin module is ready...
        const { gym_name, nit, plain_pass, email, role } = req.body;

        try {
            const result = await AuthModel.createNewUser(gym_name, nit, plain_pass, email, role);
            if (result === null) {
                return res.status(500).json({
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

    async newEmployeeAccount(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...'
            });
        }

        // TODO: add validation for granting employee accounts once the dev-admin module is ready and make sure
        //  there isn't an identical access code in the same gym
        const { gym_id_fk, nuip, employee_name, role, plain_access_code, email, phone_number } = req.body;
        try {
            // Calling the model
            const result = await EmployeesModel.createNewEmployee(gym_id_fk, nuip, employee_name, role, plain_access_code, email, phone_number);
            if(result === null) {
                return res.status(500).json({
                    message: 'Error al crear la cuenta de empleado. Por favor, inténtalo de nuevo...'
                });
            }

            console.log(`🌟 Otorgando cuenta de empleado con rol ${role}...`);
            return res.status(201).json({
                message: '¡La cuenta de empleado ha sido creada!',
                result: result
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err
            });
        }
    }

    async updateExpiredMemberships(req, res) {
        try {
            // This method updates expired memberships to status 'expired'. The gym ID comes from the auth token, not from the request body

            const gym_id = req?.gym?.id;
            if (!gym_id) {
                return res.status(404).json({
                    message: 'No se encontró el ID del gimnasio. No se pudo actualizar el estado de las membresías a vencidas.'
                });
            }

            const result = await updateStatusForExpiredMemberships(gym_id);

            const message = !result
                ? 'No hay membresías vencidas para actualizar...'
                : 'Las membresías vencidas se actualizaron correctamente...';

            return res.status(200).json({
                message,
                result: result ?? null
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