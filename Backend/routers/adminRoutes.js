const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const adminController =
  require("../controllers/adminController");

router.get(
  "/stats",
  auth,
  authorize("admin"),
  adminController.getStats
);

module.exports = router;