const db = require("../config/database");

// ===============================
// 📌 PINJAM BUKU
// ===============================
exports.borrowBook = async (req, res) => {
  const conn = await db.getConnection();

  try {
    const { user_id, book_id } = req.body || {};

    if (!user_id || !book_id) {
      return res.json({
        message: "user_id dan book_id wajib diisi"
      });
    }

    // cek user
    const [users] = await conn.query(
      "SELECT * FROM users WHERE id = ?",
      [user_id]
    );

    if (users.length === 0) {
      return res.json({
        message: "User tidak ditemukan"
      });
    }

    // cek buku
    const [books] = await conn.query(
      "SELECT stock FROM books WHERE id = ?",
      [book_id]
    );

    if (books.length === 0) {
      return res.json({
        message: "Buku tidak ditemukan"
      });
    }

    if (books[0].stock <= 0) {
      return res.json({
        message: "Stok habis"
      });
    }

    await conn.beginTransaction();

    // due date +7 hari
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    // insert borrowing
    const [result] = await conn.query(
      `INSERT INTO borrowings
      (user_id, book_id, borrow_date, due_date, status)
      VALUES (?, ?, NOW(), ?, 'borrowed')`,
      [user_id, book_id, dueDate]
    );

    // update stock
    await conn.query(
      "UPDATE books SET stock = stock - 1 WHERE id = ?",
      [book_id]
    );

    await conn.commit();

    res.json({
      message: "Peminjaman berhasil",
      borrowing_id: result.insertId
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  } finally {
    conn.release();
  }
};

// ===============================
// 📌 RETURN BUKU
// ===============================
exports.returnBook = async (req, res) => {
  const conn = await db.getConnection();

  try {
    const { borrowing_id } = req.body || {};

    if (!borrowing_id) {
      return res.json({
        message: "borrowing_id wajib diisi"
      });
    }

    const [rows] = await conn.query(
      "SELECT * FROM borrowings WHERE id = ?",
      [borrowing_id]
    );

    if (rows.length === 0) {
      return res.json({
        message: "Data tidak ditemukan"
      });
    }

    const borrowing = rows[0];

    if (borrowing.status === "returned") {
      return res.json({
        message: "Buku sudah dikembalikan"
      });
    }

    await conn.beginTransaction();

    // update borrowing
    await conn.query(
      `UPDATE borrowings
       SET return_date = NOW(),
           status = 'returned'
       WHERE id = ?`,
      [borrowing_id]
    );

    // update stock
    await conn.query(
      "UPDATE books SET stock = stock + 1 WHERE id = ?",
      [borrowing.book_id]
    );

    await conn.commit();

    res.json({
      message: "Buku berhasil dikembalikan"
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  } finally {
    conn.release();
  }
};

// ===============================
// 📌 GET ALL BORROWINGS
// ===============================
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

    res.json({
      message: "Data berhasil diambil",
      data: rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
};

// ===============================
// 📌 GET ACTIVE BORROWINGS
// ===============================
exports.getActiveBorrowings = async (req, res) => {
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
      ORDER BY b.id DESC
    `);

    res.json({
      message: "Borrowing aktif",
      data: rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
};

// ===============================
// 📌 GET OVERDUE BORROWINGS
// ===============================
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
      WHERE b.due_date < NOW()
      AND b.status = 'borrowed'
      ORDER BY b.id DESC
    `);

    res.json({
      message: "Borrowing overdue",
      data: rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
};