const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
var CryptoJS = require("crypto-js");

router.post("/register", async (req, res) => {
  try {
    const { password, ...others } = req.body;
    var passHash = CryptoJS.AES.encrypt(password, process.env.CRYPTO);
    const newUser = { ...others, password: passHash };
    const user = await User.create(newUser);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email or Password is incorrect");
  const { password, ...info } = user._doc;
  var decrypted = CryptoJS.AES.decrypt(password, process.env.CRYPTO);
  const plain = decrypted.toString(CryptoJS.enc.Utf8);
  if (req.body.password !== plain) {
    return res.status(401).send("Email or Password is incorrect");
  }
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET
  );
  return res.status(200).send({ info, token });
});
module.exports = router;
