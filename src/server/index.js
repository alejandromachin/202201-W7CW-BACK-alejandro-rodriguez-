require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { generalError, notFoundError } = require("./middlewares/errors");
const accessRouter = require("./routers/accessRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("images"));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/", accessRouter);

app.use(notFoundError);
app.use(generalError);
module.exports = app;
