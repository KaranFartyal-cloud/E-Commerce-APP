const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const express = require("express");
const generateToken = require("../config/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    res.status(400);
    throw new Error("Enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //because now matchPassword is with every doc
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, authUser };
