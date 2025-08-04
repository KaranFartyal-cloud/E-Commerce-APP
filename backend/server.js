const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const app = express();
const { connectDB } = require("./config/db.js");
const mongoose = require("mongoose");

dotenv.config();
connectDB();

const port = process.env.Port || 8080;

app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`.bgWhite);
});
