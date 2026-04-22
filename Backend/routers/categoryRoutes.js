const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const [result] = await db.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name],
    );

    res.json({ message: "Category added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);

    res.json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM categories WHERE id = ?", [id]);

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
