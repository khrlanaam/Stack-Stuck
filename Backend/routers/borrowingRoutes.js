const express = require("express");
const router = express.Router();

const borrowingsController = require("../controllers/borrowingsController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// ========================================
// USER REQUEST PINJAM BUKU
// ========================================
router.post(
  "/",
  auth,
  borrowingsController.borrowBook
);

// ========================================
// USER MELIHAT BORROWING SENDIRI
// ========================================
router.get(
  "/my",
  auth,
  borrowingsController.getMyBorrowings
);

// ========================================
// USER / ADMIN RETURN BUKU
// ========================================
router.post(
  "/return",
  auth,
  borrowingsController.returnBook
);

// ========================================
// ADMIN LIHAT REQUEST PENDING
// ========================================
router.get(
  "/pending",
  auth,
  authorize("admin"),
  borrowingsController.getPendingBorrowings
);

// ========================================
// ADMIN APPROVE REQUEST
// ========================================
router.put(
  "/approve",
  auth,
  authorize("admin"),
  borrowingsController.approveBorrowing
);

// ========================================
// ADMIN REJECT REQUEST
// ========================================
router.put(
  "/reject",
  auth,
  authorize("admin"),
  borrowingsController.rejectBorrowing
);

// ========================================
// BORROWING AKTIF
// ========================================
router.get(
  "/active",
  auth,
  borrowingsController.getActiveBorrowings
);

// ========================================
// BORROWING TERLAMBAT
// ========================================
router.get(
  "/overdue",
  auth,
  authorize("admin"),
  borrowingsController.getOverdueBorrowings
);

// ========================================
// SEMUA BORROWING
// ========================================
router.get(
  "/",
  auth,
  borrowingsController.getAllBorrowings
);

module.exports = router;