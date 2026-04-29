const express = require("express");
const router = express.Router();

const borrowingsController = require("../controllers/borrowingsController");

// debug (opsional, boleh dihapus nanti)
console.log(borrowingsController);

// ===============================
// 📌 BORROWING ROUTES
// ===============================

// pinjam buku
router.post("/", borrowingsController.borrowBook);

// return buku
router.post("/return", borrowingsController.returnBook);

// ambil semua data borrowing
router.get("/", borrowingsController.getAllBorrowings);

// ambil borrowing aktif
router.get("/active", borrowingsController.getActiveBorrowings);

// ambil borrowing overdue
router.get("/overdue", borrowingsController.getOverdueBorrowings);

module.exports = router;