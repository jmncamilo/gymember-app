const { verifyToken } = require("../lib/jwt.js");
const AuthModel = require("../models/authModel");

async function authAccessVerify(req, res, next) {
    const token = req.cookies.accessToken;
    if(!token) {
        console.log('🚫 No se encontró token de acceso.');
        return res.status(401).json({
            message: 'El token de acceso no existe...',
            access: false
        });
    }

    try {
        const validPayload = verifyToken(token);
        console.log('✅ Payload validado correctamente:', validPayload);
        // Finding user by id in the db
        const result = await AuthModel.getById(validPayload.id);
        if(!result) {
            console.log('🚫 El usuario no fue encontrado.');
            return res.status(404).json({
                message: 'El id del usuario no ha sido encontrado...',
                access: false
            });
        }
        req.gym = validPayload;
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

module.exports = authAccessVerify;