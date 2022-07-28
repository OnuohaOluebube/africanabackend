let server;
const request = require("supertest");
const { Category } = require("../../../models/categories");
const { User } = require("../../../models/user");

describe("/api/categories", () => {
  beforeEach(() => {
    server = require("../../../index.js");
  });
  afterEach(async () => {
    await server.close();
    await Category.remove({});
  });
  describe("GET /", () => {
    it("should return all categories", async () => {
      await Category.collection.insertMany([
        { name: "category1" },
        { name: "category2" },
      ]);
      const res = await request(server).get("/api/categories");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.name === "category1")).toBeTruthy();
      expect(res.body.some((c) => c.name === "category2")).toBeTruthy();
    });
  });
});
