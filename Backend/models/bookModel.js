const db = require("../config/database");

const Book = {
  // Ambil semua buku beserta nama kategori
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT
        books.*,
        categories.name AS category_name
      FROM books
      LEFT JOIN categories
      ON books.category_id = categories.id
    `);

    return rows;
  },

  // Ambil detail satu buku
  getById: async (id) => {
    const [rows] = await db.query(
      `
      SELECT
        books.*,
        categories.name AS category_name
      FROM books
      LEFT JOIN categories
      ON books.category_id = categories.id
      WHERE books.id = ?
      `,
      [id],
    );

    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query("INSERT INTO books SET ?", data);
    return result;
  },

  update: async (id, data) => {
    const [result] = await db.query("UPDATE books SET ? WHERE id = ?", [
      data,
      id,
    ]);
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM books WHERE id = ?", [id]);
    return result;
  },
};

// Buku berdasarkan kategori
const getBooksByCategory = async (categoryId) => {
  const [rows] = await db.query(
    `
    SELECT
      books.*,
      categories.name AS category_name
    FROM books
    LEFT JOIN categories
    ON books.category_id = categories.id
    WHERE books.category_id = ?
    `,
    [categoryId],
  );

  return rows;
};

// Search buku
const search = async (keyword) => {
  const [rows] = await db.query(
    `
    SELECT
      books.*,
      categories.name AS category_name
    FROM books
    LEFT JOIN categories
    ON books.category_id = categories.id
    WHERE books.title LIKE ?
       OR books.author LIKE ?
    `,
    [`%${keyword}%`, `%${keyword}%`],
  );

  return rows;
};

module.exports = {
  ...Book,
  getBooksByCategory,
  search,
};
