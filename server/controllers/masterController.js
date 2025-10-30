const isEmptyBody = require("../utils/validators/emptyBody");
const AuthModel = require("../models/authModel.js");
const EmployeesModel = require("../models/employeesModel.js");


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

        // TODO: Add some extra validation later...
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

        // Desestructurar body. Agregar validaciones después, no son necesarias, ya que el dev envía la info como debe ser
        const { gym_id_fk, nuip, employee_name, role, plain_access_code, email, phone_number } = req.body;
        try {
            // Llamar al modelo
            const result = await EmployeesModel.createNewEmployee(gym_id_fk, nuip, employee_name, role, plain_access_code, email, phone_number);
            if(result === null) {
                return res.status(500).json({
                    message: 'Error al crear la cuenta de empleado. Por favor, inténtalo de nuevo...'
                });
            }
            // Respuesta Exitosa
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

}

module.exports = new MasterController();

// TODO: también limpiar los comentarios que hay en newEmployeeAccount y volver a testear este endpoint, verificando que no haya doble solicitud...
// TODO: crear endpoint para verificar el código de acceso del empleado y dar acceso total a la app...