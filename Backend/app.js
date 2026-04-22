const express = require("express");
const app = express();

// koneksi database
require("./config/database");

// import routes
const bookRoutes = require("./routers/bookRoutes");
const categoryRoutes = require("./routers/categoryRoutes");
const userRoutes = require("./routers/userRoutes");
const borrowingRoutes = require("./routers/borrowingRoutes");
const loginRoutes = require("./routers/loginRoutes");

// the bug
console.log("bookRoutes:", typeof bookRoutes);
console.log("categoryRoutes:", typeof categoryRoutes);
console.log("userRoutes:", typeof userRoutes);
console.log("borrowingRoutes:", typeof borrowingRoutes);
console.log("loginRoutes:", typeof loginRoutes);

// middleware
app.use(express.json());

// root endpoint
app.get("/", (req, res) => {
  res.send("Backend ReadZone berjalan");
});

<<<<<<< HEAD
// books endpoint
app.use(
  "/api/books", 
  bookRoutes
);

// login endpoint
app.use(
 "/api/login",
 loginRoutes
);

// Not Found Handler
app.use((req, res) => {
   res.status(404).json({
      message: "Endpoint tidak ditemukan"
   });
});

// Eror Handler
app.use((err, req, res, next) => {
   console.error(err.stack);

   res.status(500).json({
      error: "Terjadi kesalahan pada server"
   });
});

// server
const PORT = 3000;

app.listen(PORT, () => {

   console.log(` Server running at http://localhost:${PORT}`);

});
=======
// =====================
// ROUTES
// =====================

// books
app.use("/books", bookRoutes);

// categories (INI YANG TADI KURANG ❗)
app.use("/categories", categoryRoutes);

// users
app.use("/users", userRoutes);

// borrowings (peminjaman)
app.use("/borrowings", borrowingRoutes);

// login
app.use("/login", loginRoutes);

// =====================
// SERVER
// =====================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> 52a9aef (Add category management and filter books by category)
