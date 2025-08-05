const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  testRoute,
} = require("../controllers/userController.js");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");

router.route("/register").post(registerUser);
router.route("/login").post(authUser);

router.route("/test").get(protect, isAdmin, testRoute);

module.exports = router;
