const pool = require("../db/connection.js");

class TransactionModel {
    // Insert transaction data into customers transaction table
    static async insertCustomerTransaction(connection = null, data) {
        const executor = connection || pool;
        const query = `INSERT INTO Transactions
                        (employee_id_fk,
                         customer_id_fk,
                         transaction_category,
                         transaction_type,
                         amount,
                         payment_method,
                         description)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await executor.execute(query, [
            data.employee_id_fk,
            data.customer_id_fk,
            data.transaction_category,
            data.transaction_type,
            data.amount,
            data.payment_method,
            data.description
        ]);
        return result?.affectedRows === 0 ? null : result;
    }

    // Get today's total revenue for a specific gym by id
    static async getTodayTotalRevenueByGymId(id) {
        const query = `SELECT g.gym_name,
                            COALESCE(SUM(t.amount), 0) AS today_revenue
                       FROM Transactions t
                           INNER JOIN Employees e
                               ON t.employee_id_fk = e.id
                           INNER JOIN Gym_Dev_Accounts g
                               ON e.gym_id_fk = g.id
                           INNER JOIN Customers c
                               ON t.customer_id_fk = c.id
                       WHERE g.id = ?
                       AND (t.transaction_date >= CURDATE()
                       AND t.transaction_date < DATE_ADD(CURDATE(), INTERVAL 1 DAY))
                       GROUP BY g.gym_name`;
        const [result] = await pool.execute(query, [id]);
        return result.length === 0 ? null : result[0];
    }

}

module.exports = TransactionModel;