require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function generateToken(payload, options) {
    return jwt.sign(payload, secret, options);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken
}