const express = require("express")
const app = express()

const db = require("./config/database") 

app.use(express.json())

app.get("/debug-db", (req, res) => {
    db.query("SELECT DATABASE() as db", (err, result) => {
        if (err) return res.send(err)
        res.json(result)
    })
})

app.get("/check-table", (req, res) => {
    db.query("SHOW TABLES", (err, results) => {
        if (err) return res.send(err)
        res.json(results)
    })
})

app.get("/test-db", (req, res) => {
    db.query("SELECT * FROM books", (err, results) => {
        console.log("ERROR:", err)
        console.log("RESULT:", results)

        if (err) {
            return res.status(500).send(err.message)
        }
        res.json(results)
    })
})

app.get("/", (req, res) => {
    res.send("Backend ReadZone berhasil berjalan")
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})