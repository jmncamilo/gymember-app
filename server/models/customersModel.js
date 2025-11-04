const pool = require("../db/connection.js");

class CustomersModel {
    // Insert customer data into the main table
    static async insertCustomerMainInfo(connection = null, data) {
        const executor = connection || pool;
        const query = `INSERT INTO Customers
                        (gym_id_fk,
                         enrolling_employee_id_fk,
                         nuip,
                         first_name,
                         first_last_name,
                         email,
                         phone_number,
                         profile_image_url)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await executor.execute(query, [
            data.gym_id_fk,
            data.enrolling_employee_id_fk,
            data.nuip,
            data.first_name,
            data.first_last_name,
            data.email,
            data.phone_number,
            data.profile_image_url
        ]);
        return result?.affectedRows === 0 ? null : result;
    }

    // Insert data in the customer details table
    static async insertCustomerDetailsInfo(connection = null, data) {
        const executor = connection || pool;
        const query = `INSERT INTO Customers_Details
                        (customer_id_fk,
                         gender,
                         birthdate,
                         age,
                         address,
                         city,
                         emergency_phone,
                         additional_info)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await executor.execute(query, [
            data.customer_id_fk,
            data.gender,
            data.birthdate,
            data.age,
            data.address,
            data.city,
            data.emergency_phone,
            data.additional_info
        ]);
        return result?.affectedRows === 0 ? null : result;
    }

    // Insert data into the memberships table
    // static async insertMembership(connection = null, data) {
    //     const executor = connection || pool;
    //     const query = ``;
    //     const [result] = await executor.execute(query, [data.ponerData]);
    //     return result?.affectedRows === 0 ? null : result;
    // }

}

module.exports = CustomersModel;

/*
EJEMPLO DE CÓMO ESTÁ ESTRUCTURADO EL MODELO DE LA AUTENTICACIÓN PARA GENERAR ESTANDARIZACIÓN
class AuthModel {
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
 */