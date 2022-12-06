const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

//middleware used to protect routes
//check the authorisation headers to check for "bearer"; if that is true the token is seperated from the "bearer" text
//the token is then verified and user id is then decoded from the token payload

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  //if there is no token throw error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//admin middleware
//a user's admin status can be changed in database - changing the user's isAdmin value to 1 will give the user access to update their profile
//if the user has an isAdmin value of 0 access to update profile page will be denied
const admin = (req, res, next) => {
  if (req.user.isAdmin === 0) {
    return next(new Error("You do not have permission to edit your profile", 401));
  }

  next();
};

module.exports = { protect, admin };
