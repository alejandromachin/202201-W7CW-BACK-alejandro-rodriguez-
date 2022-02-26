const verifyToken = require("./verifyToken");

require("dotenv").config();

describe("given a verifyToken ", () => {
  describe("When it receives a response with a valid token", () => {
    test("Then it should call its next method", async () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hY2hpbmF6byIsImlkIjoiNjIxOTEzMGFhNDU1NDZlMTU5YjI0NzRmIiwiaWF0IjoxNjQ1ODczMzA2fQ.Hvs9iJROuLyh3cSorjvu8SrL5ofUhrwVe-VEgVJbjgI"
          ),
      };

      const next = jest.fn();

      await verifyToken(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a response with a invalid token", () => {
    test("Then it should call its next method", async () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer eyQhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hY2hpbmF6byIsImlkIjoiNjIxOTEzMGFhNDU1NDZlMTU5YjI0NzRmIiwiaWF0IjoxNjQ1ODczMzA2fQ.Hvs9iJROuLyh3cSorjvu8SrL5ofUhrwVe-VEgVJbjgI"
          ),
      };
      const error = new Error("Invalid token");
      const next = jest.fn();

      await verifyToken(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
