const pool = require("../db/connection.js");

class AuthModel {
    // Find gym or developer user by email
    static async getByEmail(email) {
        const query = 'SELECT * FROM Gym_Dev_Accounts WHERE email = ?';
        const [result] = await pool.execute(query, [email]);
        return result.length === 0 ? null : result[0];
    }

    // Get all gym and developer accounts
    static async getAllUsers() {
        const query = 'SELECT * FROM Gym_Dev_Accounts';
        const [result] = await pool.query(query);
        return result;
    }

}

module.exports = AuthModel;