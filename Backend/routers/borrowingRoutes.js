const express = require("express");
const router = express.Router();

const borrowingsController = require("../controllers/borrowingsController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.post("/", auth, borrowingsController.borrowBook);
router.post("/return", auth, borrowingsController.returnBook);
router.get("/active", auth, borrowingsController.getActiveBorrowings);

router.get("/", auth, authorize("admin"), borrowingsController.getAllBorrowings);
router.get("/overdue", auth, authorize("admin"), borrowingsController.getOverdueBorrowings);

module.exports = router;