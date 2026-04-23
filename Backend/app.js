const express = require("express");
const app = express();

// koneksi database
require("./config/database");

// routes
const bookRoutes = require("./routers/bookRoutes");
const categoryRoutes = require("./routers/categoryRoutes");
const userRoutes = require("./routers/userRoutes");
const borrowingRoutes = require("./routers/borrowingRoutes");
const authRoutes = require("./routers/authRoutes");

// middleware
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.send("Backend ReadZone berjalan");
});

// routes
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/borrowings", borrowingRoutes);
app.use("/api/auth", authRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan"
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Terjadi kesalahan pada server"
  });
});

// server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});   