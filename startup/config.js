const config = require("config");

module.exports = function () {
  if (!config.get("private")) {
    throw new Error("FATAL ERROR: jwtPrivateKey not defined");
    process.exit(1);
  }
};
