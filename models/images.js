const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./categories");

const imagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  category: {
    type: categorySchema,
    required: true,
  },

  description: {
    type: String,
    required: true,
    minlength: 3,
  },

  s3Url: {
    type: String,
    required: true,
  },

  tags: {
    type: String,
    required: false,
  },
  datePosted: {
    type: Date,
    default: Date.now(),
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Image = mongoose.model("Image", imagesSchema);

const validateImage = (image) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).label("Name"),
    categoryId: Joi.objectId().required(),
    description: Joi.string().required().min(3).label("Description"),
    tags: Joi.string(),
    s3Url: Joi.string().required(),
  });
  return schema.validate(image);
};

exports.Image = Image;
exports.validate = validateImage;
