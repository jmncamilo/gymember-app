const pool = require("../db/connection.js");
const { hashPassword, comparePassword } = require("../lib/bcrypt.js");

class EmployeesModel {
    // Grant new employee account
    static async createNewEmployee(gym_id_fk, nuip, employee_name, role, plain_access_code, email, phone_number = null) {
        const query = 'INSERT INTO Employees (gym_id_fk, nuip, employee_name, role, hash_access_code, email, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const hashedCode = await hashPassword(plain_access_code);
        const [result] = await pool.execute(query, [gym_id_fk, nuip, employee_name, role, hashedCode, email, phone_number]);
        return result?.affectedRows === 0 ? null : result;
    }

    // Find employee account by id in specific gym (fk)
    static async getById(id, gym_id_fk) {
        const query = 'SELECT * FROM Employees WHERE id = ? AND gym_id_fk = ?';
        const [result] = await pool.execute(query, [id, gym_id_fk]);
        return result.length === 0 ? null : result[0];
    }

    // Find employee account by access code (for looping) in specific gym (fk)
    static async getByAccessCodeLooping(plain_access_code, hash_access_code, gym_id_fk) {
        const query = 'SELECT * FROM Employees WHERE hash_access_code = ? AND gym_id_fk = ?';
        const isMatch = await comparePassword(plain_access_code, hash_access_code);
        if (!isMatch) return null;
        const [result] = await pool.execute(query, [hash_access_code, gym_id_fk]); // Extra validation
        return result.length === 0 ? null : result[0];
    }

    // Find all employees in specific gym (fk)
    static async getAllEmployees(gym_id_fk) {
        const query = 'SELECT * FROM Employees WHERE gym_id_fk = ?';
        const [result] = await pool.execute(query, [gym_id_fk]);
        return result;
    }
}

module.exports = EmployeesModel;