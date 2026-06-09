const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  console.log("HEADER:", header);

  if (!header) {
    return res.status(401).json({
      message: "Token tidak ada",
    });
  }

  const token = header.split(" ")[1];

  console.log("TOKEN:", token);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (err) {

    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Token tidak valid",
    });
  }
};