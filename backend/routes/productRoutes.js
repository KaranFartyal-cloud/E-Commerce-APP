const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");
const { addProduct } = require("../controllers/productController.js");

router.route("/addProduct").post(protect, addProduct);

module.exports = router;
