const router = require("express").Router();
const Product = require("../Models/ProductModel");

router.post("/create", async (req, res) => {
  const product = req.body;
  const newProduct = await Product.create(product);
  res.status(201).send(newProduct);
});

router.get("/find/:id", async (req, res) => {
  productId = req.params.id;
  const product = await Product.findById(productId);
  res.status(200).json(product);
});

router.put("/update/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).send(product);
});

router.delete("/delete/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.send("Product Deleted");
});

module.exports = router;
