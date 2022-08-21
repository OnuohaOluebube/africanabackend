const config = require("config");

module.exports = function () {
  if (!process.env.PRIVATE) {
    throw new Error("FATAL ERROR: jwtPrivateKey not defined");
    process.exit(1);
  }
};
