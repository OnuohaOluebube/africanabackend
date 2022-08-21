const aws = require("aws-sdk");
const auth = require("../middleware/auth");
const config = require("config");
const crypto = require("crypto");
// const { promisify } = require("util");
// // const randomBytes = promisify(crypto.randomBytes);

const region = "us-east-1";
const bucketname = "africana12345";
const accessKeyId = "AKIA5EP2EPKRLTAYUUHX";
const secretAccessKey = "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";
const s3 = new aws.S3({
  region,
  signatureVersion: "v4",
  accessKeyId,
  secretAccessKey,
});

module.exports = async function generateUploadUrl() {
  const imgname = crypto.randomBytes(16).toString("hex");
  const params = {
    Bucket: bucketname,
    Key: imgname,
    Expires: 60,
  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  return uploadUrl;
};
