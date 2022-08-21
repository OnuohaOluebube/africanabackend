const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("config");

module.exports = function () {
  const db = process.env.DB;
  console.log("database", db);
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
