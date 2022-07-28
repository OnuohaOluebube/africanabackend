let server;
const mongoose = require("mongoose");
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

  describe("GET /:id", () => {
    it("should return category if valid id is passed", async () => {
      const category = new Category({
        name: "category1",
      });
      await category.save();
      const res = await request(server).get("/api/categories/" + category._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", category.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/categories/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy part and in each test change the parameter that clearly align with the name of the test
    let token;
    let name;
    const exec = () => {
      return request(server)
        .post("/api/categories/")
        .set("X-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "category1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 400 if category is less than 3 characters", async () => {
      name = "a";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should save the category if it is valid", async () => {
      await exec();
      const category = await Category.find({ name: "category1" });

      expect(category).not.toBeNull();
    });

    it("should return category if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "category1");
    });
  });

  // describe("PUT /:id", () => {
  //   // Define the happy part and in each test change the parameter that clearly align with the name of the test
  //   let token;
  //   let name;
  //   const exec = () => {
  //     return request(server)
  //       .put("/api/categories/:id")
  //       .set("X-auth-token", token)
  //       .send({ name });
  //   };

  //   beforeEach(() => {
  //     token = new User().generateAuthToken();
  //     name = "category1";
  //     id = mongoose.Types.ObjectId;
  //   });

  // it("should return 401 if client is not logged in", async () => {
  //   token = "";
  //   const res = await exec();

  //   expect(res.status).toBe(401);
  // });
  // it("should return 404 if invalid id is passed", async () => {
  //   id = "a";
  //   const res = await exec();

  //   expect(res.status).toBe(404);
  // });

  // it("should return 400 if category is less than 3 characters", async () => {
  //   name = "a";
  //   const res = await exec();

  //   expect(res.status).toBe(400);
  // });
  // it("should return category if valid id is passed", async () => {
  //   const res = await exec();

  //   expect(res.status).toBe(200);
  //   expect(res.body).toHaveProperty("name", category.name);
  // });
  // });

  // describe("DELETE /:id", () => {
  //   // Define the happy part and in each test change the parameter that clearly align with the name of the test
  //   let token;
  //   let name;
  //   const exec = () => {
  //     return request(server)
  //       .post("/api/categories/")
  //       .set("X-auth-token", token)
  //       .send({ name });
  //   };

  //   beforeEach(() => {
  //     token = new User().generateAuthToken();
  //     name = "category1";
  //   });

  // it("should return 401 if client is not logged in", async () => {
  //   token = "";
  //   const res = await exec();

  //   expect(res.status).toBe(401);
  // });
  // it("should return 404 if invalid id is passed", async () => {
  //   await exec();
  //   const res = await request(server).delete("/api/categories/1");

  //   expect(res.status).toBe(404);
  // });

  // it("should return category if valid id is passed", async () => {
  //   const category = new Category({ name });
  //   await category.save();
  //   const res = await request(server).delete(
  //     "/api/categories/" + category._id
  //   );

  //   expect(res.status).toBe(200);
  //   // expect(res.body).toHaveProperty("name", category.name);
  // });
});
