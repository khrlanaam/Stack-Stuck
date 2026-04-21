const db = require("../config/database");

const Book = {
    getAll: async () => {
        const [rows] = await db.query(
            "SELECT * FROM books"
        );

        return rows;
    },

    create: async (data) => {

        const [result] = await db.query(
            "INSERT INTO books SET ?",
            data
        );

        return result;
    },

    update: async (id, data) => {

    const [result] = await db.query(
        "UPDATE books SET ? WHERE id = ?",
        [data, id]
    );

    return result;
    },

    delete: async (id) => {

    const [result] = await db.query(
        "DELETE FROM books WHERE id = ?",
        [id]
    );

    return result;
    }
};

module.exports = Book;