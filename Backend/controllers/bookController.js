const Book = require("../models/bookModel");
const fs = require("fs");
const path = require("path");

const cleanText = (text) => text.trim().replace(/\s+/g, " ");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();

    const result = books.map((b) => ({
      ...b,
      cover_url: b.cover ? `http://localhost:3000/uploads/${b.cover}` : null,
    }));

    res.status(200).json({
      message: "Data buku berhasil diambil",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.getById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail buku berhasil diambil",
      data: {
        ...book,
        cover_url: book.cover
          ? `http://localhost:3000/uploads/${book.cover}`
          : null,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    let { title, author, description, category_id, stock } = req.body;

    if (!title || !author || !category_id) {
      return res.status(400).json({
        message: "Title, author, dan category wajib diisi",
      });
    }

    title = cleanText(title);
    author = cleanText(author);
    if (description) description = cleanText(description);

    const cover = req.file ? req.file.filename : null;

    await Book.create({
      title,
      author,
      description,
      category_id,
      stock: stock || 0,
      cover,
    });

    res.status(201).json({
      message: "Book berhasil dibuat",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, author, description, category_id, stock } = req.body;

    const oldBook = await Book.getById(id);

    if (!oldBook) {
      return res.status(404).json({
        message: "Book tidak ditemukan",
      });
    }

    const dataUpdate = {};

    if (title) dataUpdate.title = cleanText(title);
    if (author) dataUpdate.author = cleanText(author);
    if (description) dataUpdate.description = cleanText(description);
    if (category_id) dataUpdate.category_id = category_id;

    if (stock !== undefined) {
      if (stock < 0) {
        return res.status(400).json({
          message: "Stock tidak boleh negatif",
        });
      }
      dataUpdate.stock = stock;
    }

    if (req.file) {
      if (oldBook.cover) {
        const oldPath = path.join(__dirname, "../uploads", oldBook.cover);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      dataUpdate.cover = req.file.filename;
    }

    if (Object.keys(dataUpdate).length === 0) {
      return res.status(400).json({
        message: "Tidak ada data yang diupdate",
      });
    }

    await Book.update(id, dataUpdate);

    res.json({
      message: "Book berhasil diupdate",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.getById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book tidak ditemukan",
      });
    }

    if (book.cover) {
      const filePath = path.join(__dirname, "../uploads", book.cover);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Book.delete(id);

    res.json({
      message: "Book berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    let search = req.query.search || "";

    search = cleanText(search);

    const books = await Book.search(search);

    res.status(200).json({
      message: "Hasil Pencarian Buku",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
