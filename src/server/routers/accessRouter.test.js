require("dotenv").config();

const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");

const connectToDataBase = require("../../database");
const User = require("../../database/models/User");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
  await User.create({
    name: "Alejandro",
    username: "machinazo",
    password: "$2b$10$YWgU3XTyRRilXcc8uqOpNOTNu1tCzRJKrEyjrajSZJJvcutglPWXO",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given /login/ endpoint", () => {
  describe("When it receives a POST request and a wrong user", () => {
    test("then it should response with a error and the status code 404 ", async () => {
      const user = { username: "wrong" };
      const endpoint = "/login/";

      const { body } = await request(app).post(endpoint).send(user).expect(404);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with the right user and a wrong password", () => {
    test("then it should response with a error and the status code 403 ", async () => {
      const user = { username: "machinazo", password: "contrasena1233" };
      const endpoint = "/login/";

      const { body } = await request(app).post(endpoint).send(user).expect(403);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with the right user and a right password", () => {
    test("then it should response status 200 and a token ", async () => {
      const user = { username: "machinazo", password: "1234" };
      const endpoint = "/login/";

      const { body } = await request(app).post(endpoint).send(user).expect(200);

      expect(body).toHaveProperty("token");
    });
  });
});

describe("Given an /register/ endpoint ", () => {
  describe("When it recesives a POST request with an username that already exists", () => {
    test("Then it should response with the status 409 and an error", async () => {
      const user = { username: "machinazo", password: "1234" };
      const endpoint = "/register/";

      const { body } = await request(app).post(endpoint).send(user).expect(409);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it recesives a POST request with an username that doesnt exists", () => {
    test("Then it should response with the status 200 and the user created", async () => {
      const user = { username: "machinazo1", password: "1234", name: "jandru" };
      const endpoint = "/register/";

      const { body } = await request(app).post(endpoint).send(user).expect(200);

      expect(body).toHaveProperty("username");
    });
  });
});
