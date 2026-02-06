const EmployeesModel = require("../models/employeesModel.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");
const { generateToken } = require("../lib/jwt");


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
            const allEmployeesGym = await EmployeesModel.getAllEmployees(validPayload.id);

            // Check whether any employees were found
            if (allEmployeesGym.length === 0) {
                return res.status(404).json({
                    message: 'No hay ningún empleado registrado en este gimnasio...',
                    access: false
                });
            }

            // Iterate over the access code search
            let employeeFounded;
            for (const employee of allEmployeesGym) {
                employeeFounded = await EmployeesModel.getByAccessCodeLooping(plain_access_code, employee.hash_access_code, validPayload.id);
                if (employeeFounded !== null) break;
            }

            // Check that 'result' is not null, meaning a user was found by the access code
            if (employeeFounded === null) {
                return res.status(404).json({
                    message: 'El código de acceso no pertenece a ningún empleado de la base de datos...',
                    access: false
                });
            }

            // Sign employee token
            console.log('➡️ Info. del empleado:', employeeFounded);
            const payload = {
                id: employeeFounded.id,
                gym_id_fk: employeeFounded.gym_id_fk,
                role: employeeFounded.role,
                employee_name: employeeFounded.employee_name
            };
            const employeeToken = generateToken(payload, { expiresIn: '1d' });

            // Set employee token in a cookie
            res.cookie('employeeToken', employeeToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });

            // Final response ok
            return res.status(200).json({
                message: '¡Acceso otorgado al empleado para navegar dentro de la aplicacion!',
                access: true,
                employeeToken, // TESTING FIRST VERSION
                employeeFounded // TESTING FIRST VERSION
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