const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody } = require("../utils/validators/validateField.js");
const { generateToken } = require("../lib/jwt.js");
const { comparePassword } = require("../lib/bcrypt.js");
const AuthModel = require("../models/authModel.js");


class AuthController {
    constructor() {
    }

    async validateCredentials(req, res) {
        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...'
            });
        }

        // Validate body fields
        const validation = validateBody(req.body);
        if (!validation.isSuccess) {
            return res.status(400).json({
                message: '¡Error validando los datos!',
                errors: validation?.errors
            });
        }

        // Destructuring body request
        const { email, plain_pass } = req.body;

        // Start db process
        try {
            // Finding user by email and validating the query result
            const result = await AuthModel.getByEmail(email);
            if(!result) {
                return res.status(404).json({
                    message: 'El email ingresado no está registrado...'
                });
            }

            const { id, gym_name, nit, hash_pass, role, logo_url} = result;

            // Verifying password
            const isValidPassword = await comparePassword(plain_pass, hash_pass);
            if(!isValidPassword) {
                return res.status(401).json({
                    message: 'Error de inicio de sesión. Verifica tu contraseña...'
                });
            }

            // Sign access token
            const payload = {
                id,
                gym_name,
                nit,
                role,
                logo_url
            };

            const accessToken = generateToken(payload, { expiresIn: '10m' });

            // Sign refresh token
            const refreshToken = generateToken({ id, nit }, { expiresIn: '7d' });

            // Set tokens in the cookie using cookie-parser
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 10 * 60 * 1000
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // Send final response if the auth process is correct
            return res.status(200).json({
                message: 'Usuario encontrado...',
                data: result,
                accessToken, // Testing
                refreshToken // Testing
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err
            });
        }

    }
}

module.exports = new AuthController();