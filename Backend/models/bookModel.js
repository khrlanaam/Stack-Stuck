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
    }
};

module.exports = Book;