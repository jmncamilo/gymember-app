const pool = require("../db/connection.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody, validateField } = require("../utils/validators/validateField.js");
const { formatBody } = require("../utils/formatters/formatField.js");
const {
    insertCustomerDetailsInfo,
    insertCustomerMainInfo,
    insertCustomerMembership,
    membershipStatusToActive,
    getCustomerByNuip,
    updateCustomerMembership
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
            if (!resultMain) {
                throw new Error('Error al registrar la información principal del cliente...');
            }

            enrollData.customer_id_fk = resultMain.insertId; // Add key to the incoming request body object

            // Insert customer details data
            const resultDetails = await insertCustomerDetailsInfo(connection, enrollData);
            if (!resultDetails) {
                throw new Error('Error al registrar los detalles del cliente...');
            }

            // Insert customer membership data
            const resultMembership = await insertCustomerMembership(connection, enrollData);
            if (!resultMembership) {
                throw new Error('Error al registrar la membresía del cliente...');
            }

            // Commit changes
            await connection.commit();

            // Send response ok
            return res.status(200).json({
                message: '¡Cliente registrado correctamente!',
                bodyData: enrollData, // Testing CJ
                customerMainInfo: resultMain, // Testing CJ
                customerDetailInfo: resultDetails, // Testing CJ
                membershipInfo: resultMembership, // Testing CJ
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

    async atomicTransactionCustomer(req, res) {
        // This method is used to register a new payment

        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no debe estar vacío...',
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
        let transactionData = formatBody(req.body);

        // Get the employee information (id) stored in the req object of the request by the middleware
        transactionData.employee_id_fk = req.employee.id;

        // Start db process
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction(); // Begin transaction process

            // Insert data in transactions table
            const resultTransaction = await insertCustomerTransaction(connection, transactionData);
            if (!resultTransaction) {
                throw new Error('Error al registrar el pago del cliente...');
            }

            // Update status of the membership to active in Customers_Memberships table
            const resultStatusChange = await membershipStatusToActive(connection, transactionData);
            if (!resultStatusChange) {
                throw new Error('Error al cambiar el estado de la membresía del cliente...');
            }

            // Commit changes
            await connection.commit();

            // Send response ok
            return res.status(200).json({
                message: 'Pago registrado correctamente. ¡Cliente activo!',
                bodyData: transactionData, // Testing CJ
                transactionInfo: resultTransaction, // Testing CJ
                statusChangeInfo: resultStatusChange, // Testing CJ
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

    async atomicRenewTransactionCustomer(req, res) {
        // This method is used to register a renewal transaction for a customer's membership

        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud está vacío...',
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
        let transactionData = formatBody(req.body);

        // Get the employee information (id) stored in the req object of the request by the middleware
        transactionData.employee_id_fk = req.employee.id;

        // Start db process
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction(); // Begin transaction process

            // Update data in customers memberships table
            const resultUpdateMembership = await updateCustomerMembership(connection, transactionData);
            if (!resultUpdateMembership) {
                throw new Error('Error al actualizar la membresía del cliente...');
            }

            // Insert data in transactions table
            const resultTransaction = await insertCustomerTransaction(connection, transactionData);
            if (!resultTransaction) {
                throw new Error('Error al registrar el pago del cliente...');
            }

            // Update status of the membership to active in customers memberships table
            const resultStatusChange = await membershipStatusToActive(connection, transactionData);
            if (!resultStatusChange) {
                throw new Error('Error al cambiar el estado de la membresía del cliente...');
            }

            // Commit changes
            await connection.commit();

            // Send response ok
            return res.status(200).json({
                message: 'Pago registrado correctamente. ¡El cliente ha sido renovado!',
                bodyData: transactionData, // Testing CJ
                updateMembershipInfo: resultUpdateMembership, // Testing CJ
                transactionInfo: resultTransaction, // Testing CJ
                statusChangeInfo: resultStatusChange, // Testing CJ
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

    async getByNuip(req, res) {
        // This method is used to get a customer by nuip
        const { nuip } = req.params;

        // Validate nuip (just that won't be falsy)
        if (!nuip) {
            return res.status(400).json({
                message: 'El campo nuip no debe estar vacío...',
                success: false
            });
        }

        // Validate valid nuip
        const validateNuip = validateField(nuip, 'nuip');
        if (!validateNuip.success) {
            return res.status(400).json({
                message: validateNuip.message,
                success: false
            });
        }

        try {
            // Get gym id
            const gym_id_fk = req.gym.id;
            // Execute query and validate data
            const data = await getCustomerByNuip(nuip, gym_id_fk);
            if (!data) {
                return res.status(404).json({
                    message: 'No existe un cliente registrado con el número de documento consultado...',
                    success: false
                });
            }

            // Send response ok
            return res.status(200).json({
                message: '¡Cliente encontrado! Consulta de datos exitosa...',
                success: true,
                data
            });

        } catch (err) {
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err,
                success: false
            });
        }
    }
}

module.exports = new CustomersController();