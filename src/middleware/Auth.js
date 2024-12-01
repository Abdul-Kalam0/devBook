const jwt = require("jsonwebtoken");
const User = require("../models/user");

// read the token form the request cookies, validate the token and find the user if user exist
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedObj = await jwt.verify(token, "abdul");
    const { _id } = decodedObj;
    // got the user by Id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    // if user exist then send it to the route handler
    req.user = user;
    // go the the request handler if user is valid
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
