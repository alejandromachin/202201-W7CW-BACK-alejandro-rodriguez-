require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { generalError, notFoundError } = require("./middlewares/errors");
const accessRouter = require("./routers/accessRouter");

const app = express();
app.use(morgan("dev"));

app.use("/login", accessRouter);

app.use(notFoundError);
app.use(generalError);
module.exports = app;
