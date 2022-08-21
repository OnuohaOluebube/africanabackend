const express = require("express");
const { validate, User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const sendConfirmationEmail = require("../middleware/nodemailer");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get(
  "/me",
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    res.send(user);
  })
);
router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("Pending Account. Please Verify Your Email!");

    const confirmationToken = jwt.sign(
      { email: req.body.email },
      process.env.PRIVATE
    );

    user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      confirmationCode: confirmationToken,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    sendConfirmationEmail(user.firstname, user.email, user.confirmationCode);

    if (user.status != "Active")
      return res
        .status(401)
        .send("User was registered successfully! Please check your email");
  })
);

module.exports = router;
