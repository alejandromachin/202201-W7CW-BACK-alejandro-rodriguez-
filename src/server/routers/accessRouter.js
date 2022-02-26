require("dotenv").config();
const express = require("express");
const { loginUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/", loginUser);

module.exports = router;
