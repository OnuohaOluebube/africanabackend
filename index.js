const express = require("express");
const app = express();
const logger = require("./startup/logger");

// require("express-async-errors");

require("./startup/logger");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const PORT = 5000 || process.env.PORT;

const server = app.listen(PORT, () => {
  logger.log({
    level: "info",
    message: `App listening on port ${PORT}....`,
  });
});

module.exports = server;
