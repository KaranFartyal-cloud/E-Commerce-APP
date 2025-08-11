const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
const { addToCart, deleteFromCart } = require("../controllers/cartController");

router.route("/addToCart").post(protect, addToCart);
router.route("/deleteFromCart").put(protect, deleteFromCart);

module.exports = router;
