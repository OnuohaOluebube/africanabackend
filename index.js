const express = require("express");
const app = express();
const logger = require("./startup/logger");

// require("express-async-errors");

require("./startup/logger");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  logger.log({
    level: "info",
    message: `App listening on port ${PORT}....`,
  });
});
