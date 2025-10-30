const pool = require("../db/connection.js");
const { hashPassword } = require("../lib/bcrypt.js");

class EmployeesModel {
    // Grant new employee account
    static async createNewEmployee(gym_id_fk, nuip, employee_name, role, plain_access_code, email, phone_number = null) {
        const query = 'INSERT INTO Employees (gym_id_fk, nuip, employee_name, role, hash_access_code, email, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const hashedCode = await hashPassword(plain_access_code);
        const [result] = await pool.execute(query, [gym_id_fk, nuip, employee_name, role, hashedCode, email, phone_number]);
        return result?.affectedRows === 0 ? null : result;
    }
}

module.exports = EmployeesModel;