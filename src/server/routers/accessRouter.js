require("dotenv").config();
const express = require("express");
const { loginUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", loginUser);

module.exports = router;
