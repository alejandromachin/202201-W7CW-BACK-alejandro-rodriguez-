require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Username or password are wrong");
    error.code = 404;
    next(error);
  } else {
    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Username or password are wrong");
      error.code = 403;
      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);

      res.json({ token });
    }
  }
};

module.exports = { loginUser };
