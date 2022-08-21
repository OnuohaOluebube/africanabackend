const aws = require("aws-sdk");
const auth = require("../middleware/auth");
const config = require("config");
const crypto = require("crypto");
// const { promisify } = require("util");
// // const randomBytes = promisify(crypto.randomBytes);

const region = "us-east-1";
const bucketname = "africana12345";
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new aws.S3({
  region,
  signatureVersion: "v4",
  accessKeyId,
  secretAccessKey,
});

module.exports = async function generateUploadUrl() {
  let imgname = crypto.randomBytes(16).toString("hex");
  imgname += ".jpg";

  const params = {
    Bucket: bucketname,
    Key: imgname,
    Expires: 300,
  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  return uploadUrl;
};
