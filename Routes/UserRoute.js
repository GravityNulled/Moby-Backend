const router = require("express").Router();
const User = require("../Models/UserModel");
const { verifyTokenAuth, verifyToken } = require("../Utils/VerifyJwt");

router.post("/create", async (req, res) => {
  const user = req.body;
  const newUser = await User.create(user);
  res.status(201).send(newUser);
});

router.get("/find/:id", verifyToken, async (req, res) => {
  userid = req.params.id;
  const user = await User.findById(userid);
  res.status(200).json(user);
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).send(user);
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.send("User Deleted");
});

module.exports = router;
