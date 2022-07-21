const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Category = mongoose.model("Category", categorySchema);

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).label("Name"),
  });
  return schema.validate(category);
};

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
