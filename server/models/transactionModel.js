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
}

module.exports = TransactionModel;