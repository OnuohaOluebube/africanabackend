const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./categories");

const imagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  category: {
    type: categorySchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  tags: {
    type: [String],
    required: true,
    enum: ["arts", "culture", "african", "nature"],
  },
  datePosted: {
    type: Date,
    default: Date.now(),
  },
});

const Image = mongoose.model("Image", imagesSchema);

const validateImage = (image) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).label("Name"),
    categoryId: Joi.objectId().required(),
    description: Joi.string().required().min(3).max(255).label("Description"),
    tags: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate(image);
};

exports.Image = Image;
exports.validate = validateImage;
