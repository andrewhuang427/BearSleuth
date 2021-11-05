const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.ACCESS_TOKEN_SECRET;

const withAuth = (req, res, next) => {
  const authenticationHeader = req.headers.authorization;
  if (
    authenticationHeader === undefined ||
    authenticationHeader.split(" ").length <= 1
  ) {
    res.status(401).send("Unauthorized: No token provided");
  }
  const token = authenticationHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) res.status(401).send("Unauthorized: Invalid token");
    else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = {
  withAuth,
};
