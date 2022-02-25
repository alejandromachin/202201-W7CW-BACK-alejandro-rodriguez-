const { notFoundError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response json method with an error and status with 404", async () => {
      const error = { error: true, message: "Endpoint not found" };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const statusCode = 404;

      await notFoundError(null, res);

      expect(res.status).toBeCalledWith(statusCode);
      expect(res.json).toBeCalledWith(error);
    });
  });
});
