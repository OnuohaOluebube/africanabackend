const express = require("express");
const app = express();
const mongoose = require("mongoose");
const categories = require("./routes/categories");
const images = require("./routes/images");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/images", images);

mongoose
  .connect("mongodb://localhost/africana")
  .then(() => {
    console.log("Connected to mongoDB .....");
  })
  .catch((err) => {
    console.error("Cannot connect to mongoDB", err);
  });

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}....`);
});
