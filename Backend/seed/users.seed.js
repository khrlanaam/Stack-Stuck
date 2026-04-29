const bcrypt = require("bcrypt");

module.exports = async function seedUsers(conn) {
  console.log("Seeding users...");

  // source of truth (plaintext untuk dev)
  const rawUsers = [
    { name: "Admin", email: "admin@mail.com", password: "admin123", role: "admin" },
    { name: "Anam", email: "anam@mail.com", password: "anam123", role: "user" },
    { name: "Budi", email: "budi@mail.com", password: "budi123", role: "user" },
    { name: "Citra", email: "citra@mail.com", password: "citra123", role: "user" },
    { name: "Dewi", email: "dewi@mail.com", password: "dewi123", role: "user" },
    { name: "Eko", email: "eko@mail.com", password: "eko123", role: "user" },
    { name: "Fajar", email: "fajar@mail.com", password: "fajar123", role: "user" },
    { name: "Gina", email: "gina@mail.com", password: "gina123", role: "user" },
    { name: "Hadi", email: "hadi@mail.com", password: "hadi123", role: "user" },
    { name: "Indra", email: "indra@mail.com", password: "indra123", role: "user" },
  ];

  // hash semua password (parallel, tapi aman karena tidak ada dependency antar user)
  const users = await Promise.all(
    rawUsers.map(async (u) => {
      const hash = await bcrypt.hash(u.password, 10);
      return [u.name, u.email, hash, u.role];
    })
  );

  await conn.query(
    "INSERT INTO users (name, email, password, role) VALUES ?",
    [users]
  );

  // logging untuk tim (dev only)
  console.log("=== DEFAULT LOGIN (DEV) ===");
  rawUsers.forEach((u) => {
    console.log(`${u.email} | ${u.password}`);
  });
};