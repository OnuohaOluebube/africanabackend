const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/:confirmationCode", async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });
  if (!user) return res.status(404).send("User Not found.");
  const token = user.generateAuthToken();
  user.status = "Active";
  await user.save();
  console.log(token)
  res
    .header("x-auth-token", token)
    .redirect(process.env.FRONTEND_URL + "/login");
});

module.exports = router;
