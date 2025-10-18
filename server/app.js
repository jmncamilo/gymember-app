require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const employeesRoutes = require('./routes/employeesRoutes.js');

const app = express();
const PORT = process.env.PORT || 6100;

// Necessary middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}));

// Section to register routes as middlewares
app.use("/employees", employeesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});