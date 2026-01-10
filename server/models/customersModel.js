const pool = require("../db/connection.js");
const { updateByCondition } = require("../utils/helpers/updateTableByCondition.js");

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

    // Update partial resource in the customer main table
    static async updateCustomerMainInfoPartial(updateData, conditionValue, connection = null) {
        return updateByCondition(updateData, conditionValue, 'Customers', 'id', connection);
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

    // Update partial resource in the customer details table
    static async updateCustomerDetailsInfoPartial(updateData, conditionValue, connection = null) {
        return updateByCondition(updateData, conditionValue, 'Customers_Details', 'customer_id_fk', connection);
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

    // Update customer membership information (except the status)
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

    // Update partial resource in the customer membership table
    static async updateCustomerMembershipInfoPartial(updateData, conditionValue, connection = null) {
        return updateByCondition(updateData, conditionValue, 'Customers_Memberships', 'customer_id_fk', connection);
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

    // Get all customers data for a specific gym (fk) by membership status
    static async getCustomersDataByMembershipStatus(gym_id_fk, status) {
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
                       WHERE c.gym_id_fk = ? AND cm.status = ?`;
        const [result] = await pool.execute(query, [gym_id_fk, status]);
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

    // Get the count of memberships granted today for a specific gym (id)
    static async getCountMembershipsGrantedTodayByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS today_total_memberships
                       FROM Customers c
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       WHERE g.id = ?
                       AND cm.start_date = DATE(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'))
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get the count of the total active customers for a specific gym (id)
    static async getActiveCustomersCountByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS total_active_customers
                       FROM Customers c
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       WHERE g.id = ?
                       AND cm.status IN ('active', 'trial')
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get the count of the memberships that are expiring today for a specific gym (id)
    static async getExpiringMembershipsTodayByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS today_expiring_memberships
                       FROM Customers c
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       WHERE g.id = ?
                       AND cm.end_date = DATE(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'))
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get the count of the memberships that are expiring soon in the next 7 days for a specific gym (id)
    static async getExpiringMembershipsSoonByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS soon_expiring_memberships
                       FROM Customers c
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       WHERE g.id = ?
                       AND cm.end_date BETWEEN DATE(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'))
                       AND DATE_ADD(DATE(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota')), INTERVAL 7 DAY)
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get total count of new customers created in the last 30 days for a specific gym (id)
    static async getLastMonthCustomersByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS new_customers_last_month
                       FROM Customers c
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       WHERE g.id = ?
                       AND (c.created_at BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW())
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get total count of renewal customers in the last 30 days for a specific gym (id)
    static async getRenewedCustomersLastMonthByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS renewed_customers_last_month
                       FROM Customers c
                       INNER JOIN Transactions t
                           ON c.id = t.customer_id_fk
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       WHERE g.id = ?
                       AND (LOWER(t.transaction_type) IN ('renovación', 'renovacion'))
                       AND (t.transaction_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW())
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

    // Get count of customers with specific membership status for a specific gym (id)
    static async getCountByMembershipStatusAndByGymId(id, status = 'pending', columnCountName = 'pending_payments') {
        const query = `SELECT
                           g.gym_name,
                           COUNT(*) AS ${columnCountName}
                       FROM Customers c
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       WHERE g.id = ?
                       AND cm.status = ?
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id, status]);
        return result.length === 0 ? null : result[0];
    }

    // Get percentage of active customers by gender for a specific gym (id)
    static async getActiveCustomersGenderPercentageByGymId(gender, id, columnCountName) {
        const query = `SELECT
                           g.gym_name,
                           ROUND((COUNT(CASE WHEN cd.gender = ? THEN 1 END) / COUNT(*)) * 100, 0) AS ${columnCountName}
                       FROM Customers c
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       INNER JOIN Customers_Details cd
                           ON c.id = cd.customer_id_fk
                       INNER JOIN Customers_Memberships cm
                           ON c.id = cm.customer_id_fk
                       WHERE g.id = ?
                       AND cm.status IN ('active', 'trial')
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [gender, id]);
        return result.length === 0 ? null : result[0];
    }

    // Get average age of total customers registered in a specific gym (id)
    static async getAverageCustomerAgeByGymId(id) {
        const query = `SELECT
                           g.gym_name,
                           ROUND(AVG(cd.age), 0) AS avg_customers_age
                       FROM Customers c
                       INNER JOIN Gym_Dev_Accounts g
                           ON c.gym_id_fk = g.id
                       INNER JOIN Customers_Details cd
                           ON c.id = cd.customer_id_fk
                       WHERE g.id = ?
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
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