const db = require("../config/database");

const seedUsers = require("./users.seed");
const seedCategories = require("./categories.seed");
const seedBooks = require("./books.seed");
const seedBorrowings = require("./borrowings.seed");

async function resetDatabase(conn) {
  console.log("Reset database...");

  await conn.query("SET FOREIGN_KEY_CHECKS = 0");

  await conn.query("TRUNCATE TABLE borrowings");
  await conn.query("TRUNCATE TABLE books");
  await conn.query("TRUNCATE TABLE categories");
  await conn.query("TRUNCATE TABLE users");

  await conn.query("SET FOREIGN_KEY_CHECKS = 1");
}

async function runSeed() {
  const conn = await db.getConnection();

  try {
    console.log("START SEEDING...");

    await conn.beginTransaction();

    await resetDatabase(conn);

    // ORDER IS CRITICAL
    await seedUsers(conn);
    await seedCategories(conn);
    await seedBooks(conn);
    await seedBorrowings(conn);

    await conn.commit();

    console.log("SEED SUCCESS (FINAL)");
  } catch (err) {
    await conn.rollback();
    console.error("SEED ERROR:", err);
  } finally {
    conn.release();
    process.exit();
  }
}

runSeed();