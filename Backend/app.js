const express = require("express");
const app = express();

// koneksi database
require("./config/database");

// routes
const bookRoutes =
require("./routers/bookRoutes");

const loginRoutes =
require("./routers/loginRoutes");

// middleware
app.use(express.json());

// root endpoint
app.get("/", (req,res)=>{

  res.send(
   "Backend ReadZone berjalan"
  );

});

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