const { jwt_secret } = require("../config");
const jwt = require("jsonwebtoken");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB.
  // Check readme for the exact headers to be expected
  const token = req.headers.authorization; 
  const words = token.split(" ");
  const jwt_token = words[1];
  const decoded_value = jwt.verify(jwt_token, jwt_secret);
  if (decoded_value.username) {
    next();
  } else {
    res.status(403).json({ msg: "not authenticated" });
  }
}

module.exports = adminMiddleware;
