module.exports = async function seedBorrowings(conn) {
  console.log("Seeding borrowings...");

  const borrowings = [
    [2, 1, "2026-01-01", "2026-01-08", null, "borrowed"],
    [3, 2, "2026-01-02", "2026-01-09", null, "borrowed"],
    [4, 3, "2026-01-03", "2026-01-10", "2026-01-09", "returned"],
    [5, 4, "2026-01-04", "2026-01-11", null, "late"],
    [6, 5, "2026-01-05", "2026-01-12", null, "borrowed"],
    [7, 6, "2026-01-06", "2026-01-13", "2026-01-12", "returned"],
    [8, 7, "2026-01-07", "2026-01-14", null, "borrowed"],
    [9, 8, "2026-01-08", "2026-01-15", null, "late"],
    [10, 9, "2026-01-09", "2026-01-16", null, "borrowed"],
    [2, 10, "2026-01-10", "2026-01-17", "2026-01-16", "returned"],
  ];

  await conn.query(
    `INSERT INTO borrowings 
     (user_id, book_id, borrow_date, due_date, return_date, status)
     VALUES ?`,
    [borrowings]
  );
};