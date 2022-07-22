const categories = require("../routes/categories");
const images = require("../routes/images");
const users = require("../routes/users");
const auth = require("../routes/auth");
const express = require("express");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/images", images);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
