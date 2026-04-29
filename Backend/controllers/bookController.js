const Book = require("../models/bookModel");

const cleanText = (text) => text.trim().replace(/\s+/g, " ");

// GET ALL
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();

    res.status(200).json({
      message: "Data buku berhasil diambil",
      data: books
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// CREATE
exports.createBook = async (req, res) => {
  try {
    let { title, author, category_id, stock } = req.body;

    // VALIDASI
    if (!title || !author || !category_id) {
      return res.status(400).json({
        message: "Title, author, dan category wajib diisi"
      });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        message: "Stock tidak boleh negatif"
      });
    }

    title = cleanText(title);
    author = cleanText(author);

    await Book.create({
      title,
      author,
      category_id,
      stock: stock || 0
    });

    res.status(201).json({
      message: "Book berhasil dibuat"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, author, category_id, stock } = req.body;

    if (!title || !author || !category_id) {
      return res.status(400).json({
        message: "Title, author, dan category wajib diisi"
      });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        message: "Stock tidak boleh negatif"
      });
    }

    title = cleanText(title);
    author = cleanText(author);

    const updated = await Book.update(id, {
      title,
      author,
      category_id,
      stock
    });

    if (!updated) {
      return res.status(404).json({
        message: "Book tidak ditemukan"
      });
    }

    res.json({
      message: "Book berhasil diupdate"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// DELETE
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Book.delete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Book tidak ditemukan"
      });
    }

    res.json({
      message: "Book berhasil dihapus"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};