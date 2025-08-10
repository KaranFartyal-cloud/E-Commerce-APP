const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const productRoutes = require("./routes/productRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");

dotenv.config();

const port = process.env.Port || 8080;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comment", commentRoutes);

app.use(notFound); //page not found middleware
app.use(errorHandler); //error handler middleware

app.listen(port, () => {
  console.log(`app is listening on port ${port}`.bgWhite);
});
