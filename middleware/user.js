const { jwt_secret } = require("../config");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB.
  // Check readme for the exact headers to be expected
  const token = req.body.authorization;
  const words = token.split(" ");
  const jwt_token = words[1];
  const decoded_value = jwt.verify(jwt_token, jwt_secret);
  if (decoded_value.username) {
    req.username = decoded_value.username;
    next();
  } else {
    res.status(403).json({ msg: "not authenticated" });
  }

  // const token = req.body.authentication;
}

module.exports = userMiddleware;
