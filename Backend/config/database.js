require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "readzone_database",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

// test koneksi saat startup
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Database connected");
        connection.release();
    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
})();

module.exports = db;