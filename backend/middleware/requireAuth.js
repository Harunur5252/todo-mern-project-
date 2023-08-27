const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../model/user");
const requireAuth = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorized,no token");
  }
});

module.exports = requireAuth;
