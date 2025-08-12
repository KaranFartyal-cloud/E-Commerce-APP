const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error("please provide productId and quantity");
  }

  if (isNaN(quantity) || quantity <= 0) {
    res.status(400);
    throw new Error("Quanitity should be a positive integer");
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("product not found");
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId //not item._id since it's item._id will give subdocs id we ant product's id
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }
    await cart.save();
    const populatedCart = await Cart.findById(cart._id)
      .populate({
        path: "user",
        select: "name email ",
      })
      .populate({
        path: "products.product",
      });

    res.status(200);
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Failed to add to cart",
    });
  }
});

const deleteFromCart = asyncHandler(async (req, res) => {
  const { cartId, productId } = req.body;
  const userId = req.user._id;
  if (!cartId || !productId) {
    res.status(400);
    throw new Error("please provide cartId and productId");
  }

  const cart = await Cart.findOne({ _id: cartId, user: userId });

  if (!cart) {
    res.status(404);
    throw new Error("can't find the cart or user not authorize to change cart");
  }

  try {
    const productIndex = await cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity--;
      } else {
        cart.products.splice(productIndex, 1);
      }

      await cart.save();

      const updatedCart = await Cart.findById(cart._id)
        .populate({
          path: "user",
          select: "name email ",
        })
        .populate({
          path: "products.product",
        });

      res.status(200).json(updatedCart);
    } else {
      res.status(404);
      throw new Error("can't find product in the cart");
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const fetchCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404);
      throw new Error("no cart present");
    }

    const populatedCart = await Cart.findById(cart._id)
      .populate({
        path: "user",
        select: "name email ",
      })
      .populate({
        path: "products.product",
      });

    res.status(200);
    res.json(populatedCart);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { addToCart, deleteFromCart, fetchCart };
