require('dotenv').config({ path: './.env' });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const employeesRoutes = require('./routes/employeesRoutes.js');
const pool = require("./db/connection");

const app = express();
const PORT = process.env.PORT || 6100;

// Testing connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Successfully connected...');
        const [rows] = await pool.query('SELECT NOW() AS fecha'); // Test
        console.log(rows);
        connection.release(); // muy importante
    } catch (error) {
        console.error('❌ Error connecting to database:', error.message);
    }
})();

// Necessary middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}));

// Section to register private routes as middlewares
app.use("/employees", employeesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});