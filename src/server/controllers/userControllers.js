require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const path = require("path");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const User = require("../../database/models/User");
const encryptPassword = require("../utils/encryptPassword");
const firebaseConfig = require("../utils/firebaseConfig");

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

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
    const createdUser = await User.create(user);

    const oldFilename = path.join("uploads", req.file.filename);
    const newFileName = path.join("uploads", req.file.originalname);

    fs.rename(oldFilename, newFileName, () => {
      fs.readFile(newFileName, async (error, file) => {
        if (error) {
          next(error);
        }
        const fileRef = ref(storage, newFileName);
        await uploadBytes(fileRef, file);

        const imageUrl = await getDownloadURL(fileRef);

        await User.findByIdAndUpdate(createdUser.id, {
          image: imageUrl,
        });
      });
    });

    res.json(createdUser);
  } else {
    const error = new Error("Sorry, username alredy taken");
    error.code = 409;
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

module.exports = { loginUser, registerUser, getUsers };
