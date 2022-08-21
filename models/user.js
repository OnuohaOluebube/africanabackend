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
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: true }, process.env.PRIVATE);
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
