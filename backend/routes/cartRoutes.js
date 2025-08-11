const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
const { addToCart } = require("../controllers/cartController");

router.route("/addToCart").post(protect, addToCart)

module.exports = router;
