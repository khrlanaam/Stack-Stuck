const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/upload");

// PUBLIC
router.get("/", auth, bookController.getAllBooks);

// ADMIN
router.post(
  "/",
  auth,
  authorize("admin"),
  upload.single("image"),
  bookController.createBook
);

router.put(
  "/:id",
  auth,
  authorize("admin"),
  upload.single("image"),
  bookController.updateBook
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  bookController.deleteBook
);

module.exports = router;