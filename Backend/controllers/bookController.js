const Book = require("../models/bookModel");

const cleanText = (text) => text.trim().replace(/\s+/g, " ");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    let { title, author, category_id, stock } = req.body;

    if (!title || !author || !category_id || !stock) {
      return res.status(400).json({
        error: "Semua field wajib diisi",
      });
    }

    title = cleanText(title);
    author = cleanText(author);

    await Book.create({
      title,
      author,
      category_id,
      stock
    });

    res.json({
      message: "Book berhasil dibuat"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateBook = async (req, res) => {
    try {

        const { id } = req.params;
        let { title, author, category_id, stock } = req.body;

        if (!title || !author || !category_id || !stock) {
            return res.status(400).json({
                error: "Semua field wajib diisi"
            });
        }

        title = cleanText(title);
        author = cleanText(author);

        await Book.update(id, {
            title,
            author,
            category_id,
            stock
        });

        res.json({
            message: "Book berhasil diupdate"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}; 

exports.deleteBook = async (req, res) => {

    try {

        const { id } = req.params;

        await Book.delete(id);

        res.json({
            message: "Book berhasil dihapus"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};