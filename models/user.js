const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
});
const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3).max(255),
    lastname: Joi.string().required().min(3).max(255),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .min(3)
      .max(255),

    password: passwordComplexity(),
    confirmpassword: Joi.any().valid(Joi.ref("password")).required(),
  });

  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
