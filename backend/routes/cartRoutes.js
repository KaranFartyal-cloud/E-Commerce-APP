const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  addToCart,
  deleteFromCart,
  fetchCart,
} = require("../controllers/cartController");

router.route("/addToCart").post(protect, addToCart);
router.route("/deleteFromCart").put(protect, deleteFromCart);
router.route("/fetchCart").get(protect, fetchCart);

module.exports = router;
