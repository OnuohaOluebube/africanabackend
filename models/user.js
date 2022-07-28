const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, isAdmin: true },
    config.get("private")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3).max(50),
    lastname: Joi.string().required().min(3).max(50),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .min(3)
      .max(50),

    password: passwordComplexity(),
    confirmpassword: Joi.any().valid(Joi.ref("password")).required(),
  });

  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
