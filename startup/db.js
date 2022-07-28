const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  console.log(db);
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      logger.log({
        level: "info",
        message: `Connected to ${db} .....`,
      });
    });
};
