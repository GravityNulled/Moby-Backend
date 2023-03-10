const router = require("express").Router();
const Product = require("../Models/ProductModel");
const { verifyToken, verifyAdmin } = require("../Utils/VerifyJwt");

router.post("/create", verifyToken, async (req, res) => {
  const product = req.body;
  const newProduct = await Product.create(product);
  res.status(201).send(newProduct);
});

router.get("/find/:id", verifyToken, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).send(product);
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.send("Product Deleted");
});

module.exports = router;
