const express = require("express");
const {
  addComment,
  deleteComment,
  updateComment,
  getProductComments,
} = require("../controllers/commentController");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");

router.route("/addComment").post(protect, addComment);
router.route("/deleteComment").delete(protect, deleteComment);
router.route("/updateComment").put(protect, updateComment);
router.route("/getComments").get(getProductComments);

module.exports = router;
