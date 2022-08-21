const express = require("express");
const router = express.Router();

const { Image, validate } = require("../models/images");
const { User } = require("../models/user");
const { Category } = require("../models/categories");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const auth = require("../middleware/auth");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const images = await Image.find()
      .sort("-datePosted")
      .populate("user", "_id firstname lastname");
    // for (const image of images) {
    //   image.imageUrl = "https://dhjqonurh50ak.cloudfront.net/" + images.name;
    // }
    res.send(images);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image)
      return res
        .status(400)
        .send("The Image with the given ID cannot be found");

    res.send(image);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category)
      return res
        .status(400)
        .send("The Image with thwe given ID cannot be found");
    console.log(req.user);
    const image = new Image({
      name: req.body.name,
      category: {
        _id: category._id,
        name: category.name,
      },
      user: req.user._id,
      description: req.body.description,
      tags: req.body.tags,
      s3Url: req.body.s3Url,
    });
    image.save();
    image.populate("user");
    image.user = await User.findOne({ _id: req.user._id }).select(
      "_id firstname lastname"
    );
    res.send(image);
  })
);

router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const image = await Image.findByIdAndRemove(req.params.id);

    if (!image)
      return res
        .status(400)
        .send("The Image with thwe given ID cannot be found");
    res.send(image);
  })
);

router.put(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        categoryId: req.body.categoryId,
        description: req.body.description,
        tags: req.body.tags,
      },
      {
        new: true,
      }
    );
    if (!image)
      return res.status(404).send("The image with the given ID is not found");

    res.send(image);
  })
);

module.exports = router;
