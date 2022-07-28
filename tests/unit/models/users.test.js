const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.generatAuthToken", () => {
  it("should return a valid token", () => {
    const user = {
      id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const decoded = jwt.verify(token, config.get("private"));
    expect(decoded).toHaveProperty("id");
    expect(decoded).toHaveProperty("isAdmin", true);
  });
});
