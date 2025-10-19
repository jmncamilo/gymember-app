require('dotenv').config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    connectTimeout: 30000,
});

module.exports = pool;

// pool.execute() -> use for static queries with a fixed structure and defined parameters (safe and optimized for prepared statements)
// pool.query() -> use for queries without parameters or for dynamic SQL where the structure may change (e.g. optional filters or conditions)