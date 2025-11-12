const pool = require("../db/connection.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody } = require("../utils/validators/validateField.js");
const { formatBody } = require("../utils/formatters/formatField.js");
const {
    insertCustomerDetailsInfo,
    insertCustomerMainInfo,
    insertCustomerMembership
} = require("../models/customersModel.js");
const { insertCustomerTransaction } = require('../models/transactionModel.js');


class CustomersController {
    constructor() {
    }

    async atomicEnrollCustomer(req, res) {
        // This method is used to enroll a new customer and assign an initial membership type

        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...',
                success: false
            });
        }

        // Validate body fields
        const validation = validateBody(req.body);
        if (!validation.isSuccess) {
            return res.status(400).json({
                message: `¡Error validando los datos! ${Object.values(validation?.errors)[0] || ''}`,
                errors: validation?.errors,
                success: false
            });
        }

        // Formatting body fields
        let enrollData = formatBody(req.body);

        // Set profile_image_url to null since profile image functionality will be implemented after Gymember launch
        enrollData.profile_image_url = null;

        // Get the employee information stored in the req object of the request by the middleware
        enrollData.enrolling_employee_id_fk = req.employee.id;

        // Get the gym information to retrieve its ID and use it as a foreign key during data insertion
        enrollData.gym_id_fk = req.gym.id;

        // Start db process
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction(); // Begin transaction process

            // Insert main customer data
            const resultMain = await insertCustomerMainInfo(connection, enrollData);
            enrollData.customer_id_fk = resultMain.insertId; // Add key to the incoming request body object

            // Insert customer details data
            const resultDetails = await insertCustomerDetailsInfo(connection, enrollData);

            // Insert customer membership data
            const resultMembership = await insertCustomerMembership(connection, enrollData);

            // Commit changes
            await connection.commit();

            // Send response ok
            return res.status(200).json({
                message: '¡Cliente registrado correctamente!',
                bodyData: enrollData, // Testing
                customerMainInfo: resultMain, // Testing
                customerDetailInfo: resultDetails, // Testing
                membershipInfo: resultMembership, // Testing
                success: true
            });
        } catch (err) {
            await connection.rollback();
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err,
                success: false
            });
        } finally {
            connection.release(); // Release db connection
        }
    }

    async customerTransaction(req, res) {
        console.log('Lógica aquí...', req, res);
        // TODO: Empezar a construir esta mondiu
    }
}

module.exports = new CustomersController();