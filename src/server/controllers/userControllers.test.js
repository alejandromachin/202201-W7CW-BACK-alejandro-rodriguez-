const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");
const { loginUser } = require("./userControllers");

jest.mock("../../database/models/User");

describe("Given a getLogin function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then if the user does not exist it should throw an error with the status code 404 and the error message 'Username or password are wrong'", async () => {
      const req = {
        body: { username: "machinazo", password: "1234" },
      };
      const next = jest.fn();
      const error = new Error("Username or password are wrong");
      User.find = jest.fn().mockRejectedValue(null);

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then if the user exists but the password is not correct", async () => {
      const req = {
        body: { username: "machinazo", password: "1234" },
      };
      const next = jest.fn();
      const error = new Error("Username or password are wrong");
      User.find = jest.fn().mockResolvedValue(req.body);
      bcrypt.compare = jest.fn().mockRejectedValue(false);

      await loginUser(req, null, next);

      expect(next).toBeCalledWith(error);
    });

    test("Then if the user exists and the password is right it should call the json method with the token", async () => {
      const req = {
        body: { username: "machinazo", password: "1234" },
      };
      const res = {
        json: jest.fn(),
      };
      const token = "this is a token";

      User.findOne = jest.fn().mockResolvedValue(req.body);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jsonwebtoken.sign = jest.fn().mockReturnValue(token);

      await loginUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});
