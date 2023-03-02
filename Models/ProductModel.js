const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, //iPhone
  },
  company: {
    type: String,
    required: true, //Apple
  },
  model: {
    type: String,
    required: true, //iPhone X
  },
  price: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("product", productSchema);
