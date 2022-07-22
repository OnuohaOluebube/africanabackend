const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied! No token provided");
  try {
    const decoded = jwt.verify(token, config.get("private"));
    req.user = decoded;
    console.log(`Hello ${req.user.id}`);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token provided");
  }
};