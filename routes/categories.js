const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Category, validate } = require("../models/categories");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const config = require("config");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    console.log(config.get("accessKeyId"));
    const categories = await Category.find().sort("name");
    res.send(categories);
  })
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send("The category with the given id cannot be found");
    res.send(category);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = new Category({
      name: req.body.name,
    });
    await category.save();
    res.send(category);
  })
);

router.put(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!category)
      return res
        .status(404)
        .send("The Category with the given ID is not found");

    res.send(category);
  })
);

router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category)
      return res
        .status(404)
        .send("The Category with the given ID is not found");

    res.send(category);
  })
);

module.exports = router;
