const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/africana" }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({ filename: "rejections.log" }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

module.exports = logger;
