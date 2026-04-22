const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);

router.post("/", bookController.createBook);

<<<<<<< HEAD
router.put(
   "/:id",
   bookController.updateBook
);

router.delete(
   "/:id",
   bookController.deleteBook
);

module.exports = router;
=======
router.get("/category/:id", bookController.getBooksByCategory);

module.exports = router;
>>>>>>> 52a9aef (Add category management and filter books by category)
