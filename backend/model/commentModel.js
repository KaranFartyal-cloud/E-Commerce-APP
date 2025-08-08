const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  review: { type: String },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
