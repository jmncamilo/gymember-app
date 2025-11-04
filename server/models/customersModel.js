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

}

module.exports = CustomersModel;