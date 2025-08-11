const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} = require("../controllers/productController.js");

router.route("/addProduct").post(protect, addProduct);
router.route("/deleteProduct/:id").delete(protect, deleteProduct);
router.route("/updateProduct/:id").put(protect, updateProduct);
router.route("/searchProduct").get(searchProduct);

module.exports = router;
