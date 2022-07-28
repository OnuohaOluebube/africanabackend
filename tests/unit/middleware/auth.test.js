const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

describe("auth", () => {
  it("should populate req.user with the payload of valid jwt", () => {
    const user = {
      id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };

    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);

    expect(req.user).toHaveProperty("id");
    expect(req.user).toHaveProperty("isAdmin", true);
  });
});
