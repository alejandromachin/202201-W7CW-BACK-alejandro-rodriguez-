const notFoundError = (req, res) => {
  res.status(404);
  res.json({ error: true, message: "Endpoint not found" });
};

module.exports = { notFoundError };
