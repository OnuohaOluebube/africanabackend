const request = require("supertest");
const { Category } = require("../../../models/categories");
const { User } = require("../../../models/user");

let server;

describe("auth", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await server.close();
    await Category.remove({});
  });

  const exec = async () => {
    return request(server)
      .post("/api/categories")
      .set("x-auth-token", token)
      .send({ name });
  };
  beforeEach(() => {
    token = new User().generateAuthToken();
    name = "category1";
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if token is invalid", async () => {
    token = "1234";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
