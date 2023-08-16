const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  neighbours: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
