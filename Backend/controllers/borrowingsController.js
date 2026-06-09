const db = require("../config/database");

/*
|--------------------------------------------------------------------------
| BORROW BOOK
|--------------------------------------------------------------------------
*/
exports.borrowBook = async (req, res) => {
  const conn = await db.getConnection();

  try {
    const user_id = req.user.id;
    const { book_id } = req.body;

    if (!book_id || isNaN(book_id)) {
      return res.status(400).json({
        message: "book_id tidak valid",
      });
    }

    const [books] = await conn.query(
      "SELECT stock FROM books WHERE id = ?",
      [book_id]
    );

    if (books.length === 0) {
      return res.status(404).json({
        message: "Buku tidak ditemukan",
      });
    }

    if (books[0].stock <= 0) {
      return res.status(400).json({
        message: "Stok habis",
      });
    }

    const [existing] = await conn.query(
      `
      SELECT id
      FROM borrowings
      WHERE user_id = ?
      AND book_id = ?
      AND status IN ('pending','borrowed')
      `,
      [user_id, book_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message:
          "Permintaan atau peminjaman buku ini masih aktif",
      });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const [result] = await conn.query(
      `
      INSERT INTO borrowings
      (
        user_id,
        book_id,
        borrow_date,
        due_date,
        status
      )
      VALUES
      (
        ?,
        ?,
        NOW(),
        ?,
        'pending'
      )
      `,
      [user_id, book_id, dueDate]
    );

    res.json({
      message:
        "Permintaan peminjaman berhasil dikirim dan menunggu persetujuan admin",
      borrowing_id: result.insertId,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  } finally {

    conn.release();

  }
};

/*
|--------------------------------------------------------------------------
| APPROVE BORROWING
|--------------------------------------------------------------------------
*/
exports.approveBorrowing = async (req, res) => {
  const conn = await db.getConnection();

  try {
    const { borrowing_id } = req.body;

    if (!borrowing_id) {
      return res.status(400).json({
        message: "borrowing_id wajib diisi",
      });
    }

    const [rows] = await conn.query(
      "SELECT * FROM borrowings WHERE id = ?",
      [borrowing_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    const borrowing = rows[0];

    if (borrowing.status !== "pending") {
      return res.status(400).json({
        message: "Request sudah diproses",
      });
    }

    const [books] = await conn.query(
      "SELECT * FROM books WHERE id = ?",
      [borrowing.book_id]
    );

    if (books.length === 0) {
      return res.status(404).json({
        message: "Buku tidak ditemukan",
      });
    }

    if (books[0].stock <= 0) {
      return res.status(400).json({
        message: "Stok buku habis",
      });
    }

    await conn.beginTransaction();

    await conn.query(
      `
      UPDATE borrowings
      SET status = 'borrowed'
      WHERE id = ?
      `,
      [borrowing_id]
    );

    await conn.query(
      `
      UPDATE books
      SET stock = stock - 1
      WHERE id = ?
      `,
      [borrowing.book_id]
    );

    await conn.commit();

    res.json({
      message: "Peminjaman berhasil disetujui",
    });

  } catch (err) {

    await conn.rollback();

    res.status(500).json({
      error: err.message,
    });

  } finally {

    conn.release();

  }
};

/*
|--------------------------------------------------------------------------
| REJECT BORROWING
|--------------------------------------------------------------------------
*/
exports.rejectBorrowing = async (req, res) => {
  try {

    const { borrowing_id } = req.body;

    if (!borrowing_id) {
      return res.status(400).json({
        message: "borrowing_id wajib diisi",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM borrowings WHERE id = ?",
      [borrowing_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    if (rows[0].status !== "pending") {
      return res.status(400).json({
        message: "Request sudah diproses",
      });
    }

    await db.query(
      `
      UPDATE borrowings
      SET status = 'rejected'
      WHERE id = ?
      `,
      [borrowing_id]
    );

    res.json({
      message: "Peminjaman ditolak",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
|--------------------------------------------------------------------------
| RETURN BOOK
|--------------------------------------------------------------------------
*/
exports.returnBook = async (req, res) => {
  const conn = await db.getConnection();

  try {

    const { borrowing_id } = req.body;
    const user = req.user;

    const [rows] = await conn.query(
      "SELECT * FROM borrowings WHERE id = ?",
      [borrowing_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    const borrowing = rows[0];

    if (
      user.role !== "admin" &&
      borrowing.user_id !== user.id
    ) {
      return res.status(403).json({
        message: "Akses ditolak",
      });
    }

    if (borrowing.status !== "borrowed") {
      return res.status(400).json({
        message: "Buku tidak sedang dipinjam",
      });
    }

    await conn.beginTransaction();

    await conn.query(
      `
      UPDATE borrowings
      SET
        return_date = NOW(),
        status = 'returned'
      WHERE id = ?
      `,
      [borrowing_id]
    );

    await conn.query(
      `
      UPDATE books
      SET stock = stock + 1
      WHERE id = ?
      `,
      [borrowing.book_id]
    );

    await conn.commit();

    res.json({
      message: "Buku berhasil dikembalikan",
    });

  } catch (err) {

    await conn.rollback();

    res.status(500).json({
      error: err.message,
    });

  } finally {

    conn.release();

  }
};

/*
|--------------------------------------------------------------------------
| PENDING BORROWINGS
|--------------------------------------------------------------------------
*/
exports.getPendingBorrowings = async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        b.id,
        u.name AS user_name,
        bk.title AS book_title,
        b.borrow_date,
        b.due_date,
        b.status
      FROM borrowings b
      JOIN users u ON b.user_id = u.id
      JOIN books bk ON b.book_id = bk.id
      WHERE b.status = 'pending'
      ORDER BY b.id DESC
    `);

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
|--------------------------------------------------------------------------
| ALL BORROWINGS
|--------------------------------------------------------------------------
*/
exports.getAllBorrowings = async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        b.id,
        u.name AS user_name,
        bk.title AS book_title,
        b.borrow_date,
        b.due_date,
        b.return_date,
        b.status
      FROM borrowings b
      JOIN users u ON b.user_id = u.id
      JOIN books bk ON b.book_id = bk.id
      ORDER BY b.id DESC
    `);

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
|--------------------------------------------------------------------------
| MY BORROWINGS
|--------------------------------------------------------------------------
*/
exports.getMyBorrowings = async (req, res) => {
  try {

    console.log("=================================");
    console.log("LOGIN USER:", req.user);
    console.log("USER ID:", req.user.id);
    console.log("=================================");

    const [rows] = await db.query(
      `
      SELECT
        b.id,
        b.user_id,
        bk.title AS book_title,
        b.borrow_date,
        b.due_date,
        b.return_date,
        b.status
      FROM borrowings b
      JOIN books bk
        ON b.book_id = bk.id
      WHERE b.user_id = ?
      ORDER BY b.id DESC
      `,
      [req.user.id]
    );

    console.log("MY BORROWINGS:");
    console.log(rows);

    res.json(rows);

  } catch (err) {

    console.error("GET MY BORROWINGS ERROR:", err);

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
|--------------------------------------------------------------------------
| ACTIVE BORROWINGS
|--------------------------------------------------------------------------
*/
exports.getActiveBorrowings = async (req, res) => {
  try {

    const user = req.user;

    let query = `
      SELECT
        b.id,
        u.name AS user_name,
        bk.title AS book_title,
        b.borrow_date,
        b.due_date,
        b.status
      FROM borrowings b
      JOIN users u ON b.user_id = u.id
      JOIN books bk ON b.book_id = bk.id
      WHERE b.status = 'borrowed'
    `;

    let params = [];

    if (user.role !== "admin") {
      query += " AND b.user_id = ?";
      params.push(user.id);
    }

    query += " ORDER BY b.id DESC";

    const [rows] = await db.query(query, params);

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

/*
|--------------------------------------------------------------------------
| OVERDUE BORROWINGS
|--------------------------------------------------------------------------
*/
exports.getOverdueBorrowings = async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        b.id,
        u.name AS user_name,
        bk.title AS book_title,
        b.borrow_date,
        b.due_date,
        b.status
      FROM borrowings b
      JOIN users u ON b.user_id = u.id
      JOIN books bk ON b.book_id = bk.id
      WHERE b.status = 'borrowed'
      AND b.due_date < NOW()
      ORDER BY b.id DESC
    `);

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};