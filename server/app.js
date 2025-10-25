require("dotenv").config({ path: './.env' });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const employeesRoutes = require("./routes/employeesRoutes.js");
const masterRoutes = require("./routes/masterRoutes.js");
const authVerify = require("./middlewares/authVerify.js");

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
    // Middleware to verify token
app.use(authVerify);
    // Private routes
app.use('/master', masterRoutes);
app.use('/employees', employeesRoutes);

// Listening the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});