const EmployeesModel = require("../models/employeesModel.js");
const { verifyToken } = require("../lib/jwt.js");

async function accessCodeVerify(req, res, next) {
    const token = req.cookies.employeeToken;
    if (!token) {
        console.log('🚫 No se encontró el token del empleado.');
        return res.status(401).json({
            message: 'El token de acceso para el empleado no existe...',
            access: false
        });
    }

    try {
        const validEmployeePayload = verifyToken(token);
        console.log('✅ Payload del empleado validado correctamente:', validEmployeePayload);
        // Getting the validPayload provided by the auth middleware
        const validPayload = req.gym;
        // Finding employee by id in the db
        const result = await EmployeesModel.getById(validEmployeePayload.id, validPayload.id);
        if (!result) {
            console.log('🚫 El empleado no fue encontrado.');
            return res.status(404).json({
                message: 'El id del empleado no ha sido encontrado...',
                access: false
            });
        }
        req.employee = validEmployeePayload;
        next();

    } catch (err) {
        console.log('🚨 Se obtuvo el siguiente error:', err);
        return res.status(500).json({
            message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
            access: false,
            error: err?.message || err
        });
    }
}

module.exports = accessCodeVerify;