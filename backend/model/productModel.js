const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, trim: true },
    category: { type: String, trim: true, lowercase: true },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
