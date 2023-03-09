const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true, //iPhone
  },
  desc: {
    type: String,
    required: true, //32 GB Black
  },
  color: {
    type: String,
    required: true, //Black
  },
  condition: {
    type: String,
    required: true,
    default: "Referbished",
  },
  company: {
    type: String,
    required: true, //Apple
  },
  model: {
    type: String,
    required: true, //X
  },
  price: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("product", productSchema);
