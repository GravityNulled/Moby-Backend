const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // If there is no token, return an error response
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Failed to authenticate" });
    }
    // If the token is valid, save the decoded data to the request object
    req.user = user;
    next();
  });
};

const verifyTokenAuth = (req, res, next) => {
  //Verify the token first
  verifyToken(req, res, () => {
    //Check if the token is from the correct user or an admin request
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("You are not allowed to do it!s");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  //Verify the token first
  verifyToken(req, res, () => {
    //Check if the request header user is an admin
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send("Forbidden");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuth, verifyAdmin };
