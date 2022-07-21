const express = require("express");
const { validate, User } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find();

  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  });
  await user.save();
  res.send([user.firstname, user.lastname, user.email]);
});

module.exports = router;
