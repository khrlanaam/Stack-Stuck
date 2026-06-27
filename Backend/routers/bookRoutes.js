const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/upload");

// GET

// Ambil semua buku
router.get("/", auth, bookController.getAllBooks);

// Cari buku
router.get("/search", auth, bookController.searchBooks);

// Detail buku
router.get("/:id", auth, bookController.getBookById);

// POST

router.post(
  "/",
  auth,
  authorize("admin"),
  upload.single("cover"),
  bookController.createBook,
);

// PUT

router.put(
  "/:id",
  auth,
  authorize("admin"),
  upload.single("cover"),
  bookController.updateBook,
);

// DELETE

router.delete("/:id", auth, authorize("admin"), bookController.deleteBook);

module.exports = router;
