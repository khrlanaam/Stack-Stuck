require("dotenv").config()
console.log(process.env.DB_NAME)
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// koneksi
db.connect((err) => {
    if (err) {
        console.error("Koneksi gagal:", err.message)
    } else {
        console.log("Database connected")
    }
})

module.exports = db