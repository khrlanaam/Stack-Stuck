const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

// PUBLIC 
router.get("/", auth, bookController.getAllBooks);

// ADMIN 
router.post(
  "/",
  auth,
  authorize("admin"),
  bookController.createBook
);

router.put(
  "/:id",
  auth,
  authorize("admin"),
  bookController.updateBook
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  bookController.deleteBook
);

module.exports = router;