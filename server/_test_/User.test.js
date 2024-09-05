const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hash } = require("../helper/bcrypt");

beforeAll(async () => {
  let dataUserTest = require("../data/user.json").map((el) => {
    el.password = hash(el.password);
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUserTest, {});
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
});

describe("post/login", () => {
  describe("post/login - succeed", () => {
    it("should be return an object with message", async () => {
      const body = {
        userName: "User1",
        email: "user1@mail.com",
        password: "password",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });
  describe("post/login - fail", () => {
    it("should be return an object with error message", async () => {
      const body = {
        userName: "User1",
        email: "",
        password: "password",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Please insert your username, email or password (400)"
      );
    });
  });
  describe("post/login - fail", () => {
    it("should be return an object with error message", async () => {
      const body = {
        userName: "User1",
        email: "user1@mail.com",
        password: "",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Please insert your username, email or password (400)"
      );
    });
  });
  describe("post/login - fail", () => {
    it("should be return an object with error message", async () => {
      const body = {
        userName: "User1",
        email: "zusr@mail.com",
        password: "password",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid or wrong username, email or password (401)"
      );
    });
  });
  describe("post/login - fail", () => {
    it("should be return an object with error message", async () => {
      const body = {
        userName: "User1",
        email: "user1@mail.com",
        password: "wkwkwkwkwk",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid or wrong username, email or password (401)"
      );
    });
  });
});
