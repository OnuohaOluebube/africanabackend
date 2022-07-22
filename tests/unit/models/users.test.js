const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.generatAuthToken", () => {
  it("should return a valid token", () => {
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString,
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("private"));
    console.log(decoded);
    expect(decoded).toMatchObject(payload);
  });
});
