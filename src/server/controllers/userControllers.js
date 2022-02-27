require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../../database/models/User");
const encryptPassword = require("../utils/encryptPassword");

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

const registerUser = async (req, res, next) => {
  const user = req.body;

  const { username, password } = user;

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    const encryptedPassword = await encryptPassword(password);
    user.password = encryptedPassword;

    const oldFilename = path.join("uploads", req.file.filename);
    const newFileName = path.join("uploads", req.file.originalname);
    fs.rename(oldFilename, newFileName, (error) => {
      if (error) {
        next(error);
      }
    });

    user.image = newFileName;
    const createdUser = await User.create(user);

    res.json(createdUser);
  } else {
    const error = new Error("Sorry, username alredy taken");
    error.code = 409;
    next(error);
  }
};

module.exports = { loginUser, registerUser };
