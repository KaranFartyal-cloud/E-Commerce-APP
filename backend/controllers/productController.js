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

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("can't find the product");
  }

  if (
    product.seller.toString() !== req.user._id.toString() &&
    req.user.role !== 1
  ) {
    res.status(403);
    throw new Error("Not authorised to delete this product");
  }

  await Product.deleteOne({ _id: id });

  res.status(200).json({
    message: "product has been deleted",
    success: true,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (!name && !description && !price && !category) {
    res.status(400);
    throw new Error("nothing to edit");
  }

  if (
    product.seller.toString() !== req.user._id.toString() &&
    req.user.role !== 1
  ) {
    res.status(403);
    throw new Error("Not authorized to update this product");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, description, price, category, image },
    { new: true }
  ).populate("seller", "-password");

  res.status(200).json(updatedProduct);
});
module.exports = { addProduct, deleteProduct, updateProduct };
