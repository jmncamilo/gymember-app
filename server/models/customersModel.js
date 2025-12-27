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

    // Insert data into the customer membership table
    static async insertCustomerMembership(connection = null, data) {
        const executor = connection || pool;
        const query = `INSERT INTO Customers_Memberships
                        (customer_id_fk,
                         membership_type,
                         status,
                         duration_days,
                         start_date,
                         end_date)
                        VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await executor.execute(query, [
            data.customer_id_fk,
            data.membership_type,
            data.status,
            data.duration_days,
            data.start_date,
            data.end_date
        ]);
        return result?.affectedRows === 0 ? null : result;
    }

    // Update information about the customer membership
    static async updateCustomerMembership(connection = null, data) {
        const executor = connection || pool;
        const query = `UPDATE Customers_Memberships
                        SET membership_type = ?,
                            duration_days = ?,
                            start_date = ?,
                            end_date = ?
                       WHERE customer_id_fk = ?`;
        const [result] = await executor.execute(query, [
            data.membership_type,
            data.duration_days,
            data.start_date,
            data.end_date,
            data.customer_id_fk
        ]);
        return result?.affectedRows === 0 ? null : result;
    }

    // Get all customers data for a specific gym (fk)
    static async getAllCustomersData(gym_id_fk) {
        const query = `SELECT
                           g.gym_name AS gym_name,
                           c.id AS id,
                           c.nuip AS nuip,
                           c.first_name AS first_name,
                           c.first_last_name AS first_last_name,
                           c.email AS email,
                           c.phone_number AS phone_number,
                           c.profile_image_url AS profile_image_url,
                           cd.gender AS gender,
                           cd.birthdate AS birthdate,
                           cd.age AS age,
                           cd.address AS address,
                           cd.city AS city,
                           cd.emergency_phone AS emergency_phone,
                           cd.additional_info AS additional_info,
                           cm.membership_type AS membership_type,
                           cm.status AS status,
                           cm.duration_days AS duration_days,
                           cm.start_date AS start_date,
                           cm.end_date AS end_date,
                           c.created_at AS registered_at,
                           e.employee_name AS registered_by,
                           e.role AS employee_role
                       FROM Customers c
                           INNER JOIN Gym_Dev_Accounts g
                               ON c.gym_id_fk = g.id
                           INNER JOIN Employees e
                               ON c.enrolling_employee_id_fk = e.id
                           INNER JOIN Customers_Details cd
                               ON c.id = cd.customer_id_fk
                           INNER JOIN Customers_Memberships cm
                               ON c.id = cm.customer_id_fk
                       WHERE c.gym_id_fk = ?`;
        const [result] = await pool.execute(query, [gym_id_fk]);
        return result.length === 0 ? null : result;
    }

    // Get customer data by nuip including remaining membership days for a specific gym (fk)
    static async getCustomerByNuip(nuip, gym_id_fk) {
        const query = `SELECT
                           c.id AS id_customer,
                           c.nuip AS nuip,
                           c.first_name AS first_name,
                           c.first_last_name AS first_last_name,
                           c.email AS email,
                           c.phone_number AS phone_number,
                           c.profile_image_url AS profile_image_url,
                           cd.gender AS gender,
                           cd.birthdate AS birthdate,
                           cd.age AS age,
                           cd.address AS address,
                           cd.city AS city,
                           cd.emergency_phone AS emergency_phone,
                           cd.additional_info AS additional_info,
                           cm.membership_type AS membership_type,
                           cm.status AS status,
                           cm.duration_days AS duration_days,
                           cm.start_date AS start_date,
                           cm.end_date AS end_date,
                           DATEDIFF(cm.end_date, CURDATE()) AS days_remaining
                       FROM Customers c
                       INNER JOIN Customers_Details cd
                           ON c.id = cd.customer_id_fk
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       WHERE nuip = ? AND gym_id_fk = ?`;
        const [result] = await pool.execute(query, [nuip, gym_id_fk]);
        return result.length === 0 ? null : result[0];
    }

    // Updating membership status to active
    static async membershipStatusToActive(connection = null, data) {
        const executor = connection || pool;
        const query = `UPDATE Customers_Memberships
                        SET status = 'active'
                        WHERE customer_id_fk = ?`;
        const [result] = await executor.execute(query, [data.customer_id_fk]);
        return result?.affectedRows === 0 ? null : result;
    }
}

module.exports = CustomersModel;