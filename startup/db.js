const mongoose = require("mongoose");
const logger = require("./logger");
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/africana", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      logger.log({
        level: "info",
        message: "Connected to mongoDB .....",
      });
    });
};
