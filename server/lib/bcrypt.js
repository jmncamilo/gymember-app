const bcrypt = require("bcrypt");

async function hashPassword(plainPass) {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(plainPass, saltRounds);
    } catch (err) {
        console.error('Error in the process of password hashing...', err);
        throw err;
    }
}

async function comparePassword(plainPass, hashedPass) {
    try {
        return await bcrypt.compare(plainPass, hashedPass);
    } catch (err) {
        console.error('Error in the process of validate hashed password...', err);
        throw err;
    }
}

module.exports = {
    hashPassword,
    comparePassword
}