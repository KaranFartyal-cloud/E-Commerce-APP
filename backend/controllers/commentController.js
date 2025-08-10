const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const express = require("express");
const Product = require("../model/productModel.js");
const Comment = require("../model/commentModel.js");

const addComment = asyncHandler(async (req, res) => {
  const { review, productId } = req.body;

  const sender = req.user._id;

  if (!review || !productId) {
    res.status(400);
    throw new Error("please provide review and id of the product");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("can't find the product");
  }

  const newComment = {
    review,
    sender,
    product: productId,
  };

  try {
    let comment = await Comment.create(newComment);
    comment = await comment.populate("sender", "-password");
    comment = await comment.populate("product");
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("can' find the comment");
  }

  if (comment.sender.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("not authorized to delete this comment");
  }

  await Comment.deleteOne({ _id: id });

  res.status(200).json({
    message: "comment has been deleted",
    success: true,
  });
});

const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  // Validate input
  if (!review) {
    res.status(400);
    throw new Error("Review text is required");
  }

  // Check comment existence and ownership
  const comment = await Comment.findById(id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }
  if (comment.sender.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  // Update only the review field
  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { review },
    { new: true }
  ).populate("sender", "name email"); // Only populate sender (no product)

  res.status(200).json({
    success: true,
    data: updatedComment,
  });
});

const getProductComments = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error("please provide product Id");
  }

  try {
    const comments = await Comment.find({ product: productId }).populate(
      "sender",
      "name pic email"
    );

    res.status(200);
    res.send(comments);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getProductComments,
};
