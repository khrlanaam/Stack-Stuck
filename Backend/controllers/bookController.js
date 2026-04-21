const Book = require("../models/bookModel");

const cleanText = (text) =>
    text.trim().replace(/\s+/g, " ");

exports.getAllBooks = async (req, res) => {
    try {

        const books = await Book.getAll();

        res.json(books);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};

exports.createBook = async (req, res) => {

    try {

        let {
            title,
            author,
            category_id,
            stock
        } = req.body;

        if (
            !title ||
            !author ||
            !category_id ||
            !stock
        ) {

            return res.status(400).json({
                error: "Semua field wajib diisi"
            });

        }

        title = cleanText(title);
        author = cleanText(author);

        const result = await Book.create({
            title,
            author,
            category_id,
            stock
        });

        res.status(201).json({
            message: "Book berhasil ditambahkan",
            id: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};