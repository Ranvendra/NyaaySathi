const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );

  return token;
}

function verifyToken(token) {
  const isverified = jwt.verify(token, process.env.JWT_SECRET);
  return isverified;
}

module.exports = { generateToken, verifyToken };
