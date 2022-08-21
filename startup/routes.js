const categories = require("../routes/categories");
const images = require("../routes/images");
const users = require("../routes/users");
const auth = require("../routes/auth");
const verifyuser = require("../routes/verifyuser");
const express = require("express");
const error = require("../middleware/error");
const s3url = require("../routes/s3url");
var cors = require("cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/categories", categories);
  app.use("/api/images", images);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/s3url", s3url);
  app.use("/api/verifyuser", verifyuser);
  app.use(error);
};
