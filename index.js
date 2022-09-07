const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const logger = require("./startup/logger");



require("./startup/logger");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.log({
    level: "info",
    message: `App listening on port ${PORT}....`,
  });
});

module.exports = server;
