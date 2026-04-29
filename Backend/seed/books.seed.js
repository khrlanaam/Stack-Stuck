module.exports = async function seedBooks(conn) {
  console.log("Seeding books...");

  const books = [
    ["Belajar Node.js", "Andi", "Dasar backend Node.js", 1, 5],
    ["Express Guide", "Eko", "Framework Node.js", 1, 3],
    ["MySQL Dasar", "Rudi", "Belajar database", 2, 4],
    ["Computer Networks", "Tanenbaum", "Jaringan komputer", 3, 6],
    ["Docker Basics", "Budi", "Containerization", 4, 5],
    ["Cyber Security 101", "Kevin", "Keamanan sistem", 5, 4],
    ["Flutter Guide", "Sinta", "Mobile dev", 6, 7],
    ["Laravel Advanced", "Rizky", "Backend PHP", 7, 5],
    ["Data Science Intro", "Ahmad", "Analisis data", 8, 6],
    ["AI Fundamentals", "John", "Machine learning", 9, 5],
  ];

  await conn.query(
    `INSERT INTO books (title, author, description, category_id, stock)
     VALUES ?`,
    [books]
  );
};