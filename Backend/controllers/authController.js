const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Semua field wajib diisi",
      });
    }

    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Register berhasil",
    });

  } catch (err) {

    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      error: err.message,
    });

  }
};

// LOGIN
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("================================");
    console.log("LOGIN ATTEMPT");
    console.log("EMAIL:", email);

    if (!email || !password) {
      return res.status(400).json({
        error: "Email dan password wajib diisi",
      });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log("QUERY RESULT:", users);

    if (users.length === 0) {
      console.log("USER NOT FOUND");

      return res.status(401).json({
        error: "Email atau password salah",
      });
    }

    const user = users[0];

    console.log("USER FOUND:");
    console.log({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("INPUT PASSWORD :", password);
    console.log("HASH PASSWORD  :", user.password);
    console.log("PASSWORD MATCH :", isMatch);

    if (!isMatch) {

      console.log("PASSWORD INVALID");

      return res.status(401).json({
        error: "Email atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES || "1d",
      }
    );

    console.log("LOGIN SUCCESS");
    console.log("================================");

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.log("LOGIN ERROR:");
    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
};

module.exports = {
  register,
  login,
};