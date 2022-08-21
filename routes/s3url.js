const express = require("express");
const router = express.Router();
const generateUploadUrl = require("../middleware/s3url");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const url = await generateUploadUrl();
  res.send(url);
});

module.exports = router;
