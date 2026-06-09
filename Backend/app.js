require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// DATABASE
require("./config/database");

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// LOGGING
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ROUTES
const bookRoutes = require("./routers/bookRoutes");
const categoryRoutes = require("./routers/categoryRoutes");
const userRoutes = require("./routers/userRoutes");
const borrowingRoutes = require("./routers/borrowingRoutes");
const authRoutes = require("./routers/authRoutes");
const adminRoutes = require("./routers/adminRoutes");

// ROOT
app.get("/", (req, res) => {
  res.send("Backend ReadZone berjalan");
});

// API ROUTES
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/borrowings", borrowingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: err.message || "Terjadi kesalahan pada server",
  });
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});