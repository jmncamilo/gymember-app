require("dotenv").config({ path: './.env' });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const employeesRoutes = require("./routes/employeesRoutes.js");
const customersRoutes = require("./routes/customersRoutes.js");
const masterRoutes = require("./routes/masterRoutes.js");
const authVerify = require("./middlewares/authVerify.js");
const accessCodeVerify = require("./middlewares/accessCodeVerify");

const app = express();
const PORT = process.env.PORT || 6100; // Port config

// Necessary middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}));

// Section to register public routes as middlewares
app.use('/auth', authRoutes);

// Section to register private routes as middlewares
        // Middleware to verify auth tokens
app.use(authVerify);
    // Private routes that require auth token verification
app.use('/master', masterRoutes);
app.use('/employees', employeesRoutes);
        // Middleware to verify employee token (access code)
app.use(accessCodeVerify);
    // Private routes that require auth token and employee token verification
// TODO: Poner a funcionar algún módulo del home del frontend, es decir la esencia de la app como tal...
//  puede ser registrar un cliente, para empezar a meter usuarios y luego probar el dashboard...
app.use('/customers', customersRoutes);

// Listening the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});