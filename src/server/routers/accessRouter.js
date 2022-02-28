require("dotenv").config();
const express = require("express");
const multer = require("multer");
const {
  loginUser,
  registerUser,
  getUsers,
} = require("../controllers/userControllers");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", upload.single("avatar"), registerUser);
router.get("/users", getUsers);

module.exports = router;
