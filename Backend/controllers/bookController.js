const Book = require("../models/bookModel");

const cleanText = (text) => text.trim().replace(/\s+/g, " ");

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

exports.createBook = async (req, res) => {
  try {
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

    
    const cover = req.file ? req.file.filename : null;

    await Book.create({
      title,
      author,
      category_id,
      stock: stock || 0,
      cover   
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

    
    const dataUpdate = {
      title,
      author,
      category_id,
      stock
    };

    
    if (req.file) {
      dataUpdate.image = req.file.filename;
    }

    const updated = await Book.update(id, dataUpdate);

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