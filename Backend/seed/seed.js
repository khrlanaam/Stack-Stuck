const db = require("../config/database.js");

async function seed() {
  const conn = await db.getConnection();

  try {
    console.log("Start seeding...");

    await conn.beginTransaction();

    // RESET DATA
    await conn.query("DELETE FROM borrowings");
    await conn.query("DELETE FROM books");
    await conn.query("DELETE FROM categories");
    await conn.query("DELETE FROM users");

    // USERS
    console.log("Insert users...");
    await conn.query(`
      INSERT INTO users (name, email, password, role) VALUES
      ('Admin', 'admin@mail.com', '$2b$hash_admin', 'admin'),
      ('Anam', 'anam@mail.com', '$2b$hash_user', 'user'),
      ('Budi', 'budi@mail.com', '$2b$hash_user', 'user')
    `);

    // CATEGORIES
    console.log("Insert categories...");
    await conn.query(`
      INSERT INTO categories (name) VALUES
      ('Programming'),
      ('Database'),
      ('Networking')
    `);

    // BOOKS
    console.log("Insert books...");
    await conn.query(`
      INSERT INTO books (title, author, description, category_id, stock) VALUES
      ('Belajar Node.js', 'Andi', 'Dasar backend Node.js', 1, 5),
      ('Express Guide', 'Eko', 'Framework Node.js', 1, 3),
      ('MySQL Dasar', 'Rudi', 'Belajar database', 2, 4),
      ('Computer Networks', 'Tanenbaum', 'Jaringan komputer', 3, 6)
    `);

    // BORROWINGS
    console.log("Insert borrowings...");
    await conn.query(`
      INSERT INTO borrowings (user_id, book_id, borrow_date, due_date, status)
      VALUES
      (2, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'borrowed'),
      (3, 2, DATE_SUB(CURDATE(), INTERVAL 10 DAY), DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'borrowed'),
      (2, 3, DATE_SUB(CURDATE(), INTERVAL 5 DAY), CURDATE(), 'returned')
    `);

    await conn.commit();

    console.log("SEED SUCCESS");
  } catch (err) {
    await conn.rollback();
    console.error("SEED ERROR:", err);
  } finally {
    conn.release();
    process.exit();
  }
}

seed();