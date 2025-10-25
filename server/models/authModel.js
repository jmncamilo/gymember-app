const pool = require("../db/connection.js");
const { hashPassword } = require("../lib/bcrypt.js");

class AuthModel {
    // Find gym or developer user by email
    static async getByEmail(email) {
        const query = 'SELECT * FROM Gym_Dev_Accounts WHERE email = ?';
        const [result] = await pool.execute(query, [email]);
        return result.length === 0 ? null : result[0];
    }

    // Find gym or developer user by id
    static async getById(id) {
        const query = 'SELECT * FROM Gym_Dev_Accounts WHERE id = ?';
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get all gym and developer accounts
    static async getAllUsers() {
        const query = 'SELECT * FROM Gym_Dev_Accounts';
        const [result] = await pool.query(query);
        return result;
    }

    // Grant new user account
    static async createNewUser(gym_name, nit, plain_pass, email, role) {
        const query = 'INSERT INTO Gym_Dev_Accounts (gym_name, nit, hash_pass, email, role) VALUES (?, ?, ?, ?, ?)';
        const hashedPass = await hashPassword(plain_pass);
        const [result] = await pool.execute(query, [gym_name, nit, hashedPass, email, role]);
        return result?.affectedRows === 0 ? null : result;
    }

}

module.exports = AuthModel;