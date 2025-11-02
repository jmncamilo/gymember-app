const pool = require("../db/connection.js");
const isEmptyBody = require("../utils/validators/emptyBody.js");
const { validateBody } = require("../utils/validators/validateField.js");


class CustomersController {
    constructor() {
    }

    async atomicEnrollCustomer(req, res) {
        // This method is used to enroll a new customer and assign an initial membership type

        // Validate that body is not empty
        if (isEmptyBody(req.body)) {
            return res.status(400).json({
                message: 'El cuerpo de la solicitud no puede estar vacío...'
            });
        }

        // Validate body fields
            // TODO: falta agregar campos al diccionario validador, para verificar el body al 100%. Una vez puestos, descomentar...
        // const validation = validateBody(req.body);
        // if (!validation.isSuccess) {
        //     return res.status(400).json({
        //         message: '¡Error validando los datos!',
        //         errors: validation?.errors
        //     });
        // }

        // Esta vez no vamos a desestructurar porque no es práctico, vienen muchos datos... solo referenciamos en otra variable
        const enrollData = req.body;

        // Start db process
        const connection = await pool.getConnection();
        try {
            // TODO: aquí se debe usar connection para iniciar la transacción, commit para ejecutar correctamente y release para liberarla...
            await connection.beginTransaction(); // Comienza la transacción
            console.log('Vamos a poner aquí la lógica para consumir el modelo bd de empleados...');
            await connection.commit(); // Realiza los cambios
            // TODO: aquí enviamos la respuesta positiva ya que llegado este punto todo habrá salido bien...
        } catch (err) {
            await connection.rollback();
            return res.status(500).json({
                message: 'Error en el servidor. Vuelve a intentarlo en unos minutos...',
                error: err?.message || err
            });
        } finally {
            connection.release(); // Libera la conexión
        }

    }

}

module.exports = new CustomersController();