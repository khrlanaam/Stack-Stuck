const db = require("../config/database");

exports.getStats = async (req, res) => {
  try {

    const [books] = await db.query(
      "SELECT COUNT(*) AS totalBooks FROM books"
    );

    const [users] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [borrowings] = await db.query(
      `SELECT COUNT(*) AS totalBorrowings
       FROM borrowings
       WHERE status = 'borrowed'`
    );

    const [overdue] = await db.query(
      `SELECT COUNT(*) AS totalOverdue
       FROM borrowings
       WHERE status = 'borrowed'
       AND due_date < NOW()`
    );

    res.json({
      totalBooks: books[0].totalBooks,
      totalUsers: users[0].totalUsers,
      totalBorrowings:
        borrowings[0].totalBorrowings,
      totalOverdue:
        overdue[0].totalOverdue,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};