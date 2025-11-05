const pool = require("../db/connection.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody } = require("../utils/validators/validateField.js");
const {
    insertCustomerDetailsInfo,
    insertCustomerMainInfo,
    insertCustomerMembership
} = require("../models/customersModel.js");


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
            // TODO: falta agregar campos al diccionario validador, para verificar el body al 100%. Una vez puestos, descomentar...
        // const validation = validateBody(req.body);
        // if (!validation.isSuccess) {
        //     return res.status(400).json({
        //         message: '¡Error validando los datos!',
        //         errors: validation?.errors,
        //         success: false
        //     });
        // }

        // TODO: también hay que formatear los campos explícitamente al tipo que la bd requiere, para más robustez...

        // Esta vez no vamos a desestructurar porque no es práctico, vienen muchos datos... solo referenciamos en otra variable
        let enrollData = req.body; // TODO: esto con el formatter desaparece y solo queda enrollData que es donde se almacenarán los datos formateados
        // Traemos la información del empleado que hemos seteado en el objeto req de la petición producto del middleware
        enrollData.enrolling_employee_id_fk = req.employee.id;
        // Hacemos lo mismo con la info del gym para obtener el ID del gym y que nos sirva de llave foránea al momento de la inserción
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
                bodyData: enrollData,
                customerMainInfo: resultMain,
                customerDetailInfo: resultDetails,
                membershipInfo: resultMembership,
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
}

module.exports = new CustomersController();