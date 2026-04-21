const express = require("express");
const app = express();

require("./config/database");

const bookRoutes =
require("./routers/bookRoutes");

app.use(express.json());

app.get("/", (req, res) => {
    res.send(
      "Backend ReadZone berjalan"
    );
});

app.use("/books", bookRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
});