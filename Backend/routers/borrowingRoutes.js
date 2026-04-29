const express = require("express");
const router = express.Router();

const borrowingsController = require("../controllers/borrowingsController");

console.log(borrowingsController);


router.post("/", borrowingsController.borrowBook);

router.post("/return", borrowingsController.returnBook);

router.get("/", borrowingsController.getAllBorrowings);

router.get("/active", borrowingsController.getActiveBorrowings);

router.get("/overdue", borrowingsController.getOverdueBorrowings);

module.exports = router;