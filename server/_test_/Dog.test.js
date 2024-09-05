const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");

let access_token;
beforeAll(async () => {
  let dataUserTest = require("../data/user.json").map((el) => {
    el.password = hash(el.password);
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUserTest, {});
  const payload = {
    id: 1,
    email: "user1@mail.com",
  };
  access_token = signToken(payload);
});
afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
});
describe("post/dogs", () => {
  describe("post/dogs - succed", () => {
    it("post/dogs", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };
      const response = await request(app)
        .post("/dogs")
        .send(body)
        .set("Authorization", `bearer, ${access_token}`);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
    describe("post/dogs - fail", () => {
      it("should be return an object with message", async () => {
        const body = {
          name: "rizki",
          breed: "rizki albino",
          averangeAge: "12-30",
          averangeWeight: "20-80 kg",
          description: "putih banget dah",
          Image:
            "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
        };

        const response = await request(app).post("/products").send(body);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Please login first (401)"
        );
      });
      it("should be return an object with message", async () => {
        const body = {
          name: "rizki",
          breed: "rizki albino",
          averangeAge: "12-30",
          averangeWeight: "20-80 kg",
          description: "putih banget dah",
          Image:
            "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
        };

        const response = await request(app)
          .post("/dogs")
          .send(body)
          .set("Authorization", `Bearer, blalalala`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "please login again(401)"
        );
      });
      it("should be return an object with message", async () => {
        const body = {
          name: "",
          breed: "",
          averangeAge: "",
          averangeWeight: "20-80 kg",
          description: "putih banget dah",
          Image:
            "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
        };

        const response = await request(app)
          .post("/dogs")
          .send(body)
          .set("Authorization", `Bearer, ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
    });
  });
});

describe("put/dogs/:id", () => {
  describe("put/dogs/:id - succeed", () => {
    it("should be return an object with message", async () => {
      const body = {
        name: "Product 1",
      };

      const response = await request(app)
        .put("/dogs/1")
        .send(body)
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "successfully update data Dog"
      );
    });
  });
  describe("put/dogs/:id - fail", () => {
    it("should be return an object with message", async () => {
      const body = {
        name: "Product 1",
      };

      const response = await request(app).put("/dogs/4").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Please login first (401)"
      );
    });
    it("should be return an object with message", async () => {
      const body = {
        name: "Product 1",
      };

      const response = await request(app)
        .put("/dogs/4")
        .send(body)
        .set("Authorization", `Bearer, blalalala`);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "please login again(401)"
      );
    });
    it("should be return an object with message", async () => {
      const body = {
        name: "Product 1",
      };

      const response = await request(app)
        .put("/dogs/36")
        .send(body)
        .set("Authorization", `Bearer, ${access_token}`);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Not found (404)");
    });
  });
});

describe("delete/dogs/:id", () => {
  describe("delete/dogs/:id - succeed", () => {
    it("should be return an object with message", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };

      const response = await request(app)
        .delete("/dogs/1")
        .send(body)
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("delete/dogs/:id - fail", () => {
    it("should be return an object with message", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };

      const response = await request(app).delete("/dogs/4").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Please login first (401)"
      );
    });
    it("should be return an object with message", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };

      const response = await request(app)
        .delete("/dogs/4")
        .send(body)
        .set("Authorization", `Bearer, blalalala`);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "please login again(401)"
      );
    });
    it("should be return an object with message", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };

      const response = await request(app)
        .delete("/dogs/36")
        .send(body)
        .set("Authorization", `Bearer, ${access_token}`);

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Not found (404)");
    });
  });
});
describe("GET /dogs", () => {
  describe("GET /dogs - success", () => {
    it.only("should return an empty array if no dogs are found", async () => {
      const response = await request(app)
        .get("/dogs")
        .set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
    it.only("should be return an object with message", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };

      const response = await request(app)
        .get("/dogs")
        .send(body)
        .set("Authorization", `Bearer, ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "success read data dogs");
    });
  });
  describe("dogs/ - fail", () => {
    it.only("should be return an object with message", async () => {
      const body = {
        name: "rizki",
        breed: "rizki albino",
        averangeAge: "12-30",
        averangeWeight: "20-80 kg",
        description: "putih banget dah",
        Image:
          "https://png.pngtree.com/thumb_back/fw800/background/20230530/pngtree-very-nice-albino-stafford-puppy-with-blue-eyes-photo-image_2845050.jpg",
      };

      const response = await request(app).delete("/dogs/4").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Please login first (401)"
      );
    });
  });
});
