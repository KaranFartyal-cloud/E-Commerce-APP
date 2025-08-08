const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const express = require("express");
const Product = require("../model/productModel.js");

const addProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== 1) {
    res.status(400).send("you are not a seller");
    return;
  }
  const { name, description, price, category, image } = req.body;

  if (!name || !price) {
    res.status(400);
    throw new Error("Name and price are required");
  }

  const newProduct = {
    name,
    description,
    price,
    category,
    image,
    seller: req.user._id, // Secure: Only uses logged-in user's ID
  };

  try {
    let product = await Product.create(newProduct);
    product = await product.populate("seller", "-password"); // Match schema field
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { addProduct };
