require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6100;
const employeesRoutes = require('./routes/employeesRoutes.js');

app.use("/employees", employeesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});