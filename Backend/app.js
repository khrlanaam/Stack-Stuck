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
 "/books",
 bookRoutes
);

// login endpoint
app.use(
 "/login",
 loginRoutes
);

// server
const PORT = 3000;

app.listen(PORT,()=>{

 console.log(
  `Server running on port ${PORT}`
 );

});