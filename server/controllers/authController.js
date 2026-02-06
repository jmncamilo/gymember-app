const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody } = require("../utils/validators/validateField.js");
const { generateToken } = require("../lib/jwt.js");
const { comparePassword } = require("../lib/bcrypt.js");
const AuthModel = require("../models/authModel.js");
const { verifyToken } = require("../lib/jwt");


class AuthController {
    constructor() {
    }

    async validateRefreshToken(req, res) {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: 'El token de refresco no existe...',
                access: false
            });
        }
        // Verify refresh token and extract payload
        try {
            const validPayload = verifyToken(token);
            console.log('El token de refresco se ha validado correctamente:', validPayload);

            // Finding user in the db by id
            if (!validPayload?.id) {
                return res.status(403).json({
                    message: 'Token de refresco inválido, el id de usuario no existe...',
                    access: false
                });
            }
            const result = await AuthModel.getById(validPayload.id); // Executing query
            if (!result) {
                return res.status(404).json({
                    message: 'El usuario no ha sido encontrado...',
                    access: false
                });
            }

            // Generate new access token with the same payload structure that login
            const newAccessToken = generateToken({
                id: validPayload.id,
                gym_name: result.gym_name,
                nit: validPayload.nit,
                role: result.role,
                logo_url: result.logo_url
            }, { expiresIn: '10m' });

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 10 * 60 * 1000
            });

            return res.status(200).json({
                message: 'Token de acceso renovado correctamente...',
                access: true
            });

        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'El token de refresco ha expirado. Inicia sesión nuevamente...',
                    access: false
                });
            }

            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: 'Token de refresco inválido...',
                    access: false
                });
            }

            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                access: false,
                error: err?.message || err
            });
        }
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
        const { nit: nitBody, plain_pass } = req.body;

        // Start db process
        try {
            // Finding user by NIT and validating the query result
            const result = await AuthModel.getByNit(nitBody);
            if (!result) {
                return res.status(404).json({
                    message: 'El NIT ingresado no está registrado...'
                });
            }

            const { id, gym_name, nit, hash_pass, role, logo_url} = result;

            // Verifying password
            const isValidPassword = await comparePassword(plain_pass, hash_pass);
            if (!isValidPassword) {
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
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 10 * 60 * 1000
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // Send final response if the auth process is correct
            return res.status(200).json({
                message: 'Credenciales validadas correctamente. Accediendo...',
                data: result,
                accessToken, // TESTING FIRST VERSION
                refreshToken // TESTING FIRST VERSION
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err
            });
        }

    }

    async logout(req, res) {
        try {
            // Configuration object for cookie deletion
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/'
            };

            res.clearCookie('accessToken', cookieOptions);
            res.clearCookie('refreshToken', cookieOptions);
            res.clearCookie('employeeToken', cookieOptions);

            return res.status(200).json({
                message: '¡Credenciales invalidadas correctamente!',
                success: true
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err,
                success: false
            });
        }
    }
}

module.exports = new AuthController();