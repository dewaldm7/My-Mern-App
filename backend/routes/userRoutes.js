//userRoutes are exported to server.js
//registerUser, loginUser, updateUser and authUser functions are imported from userControllers

const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
//protect middleware to protect routes imported from authmiddleware
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();
//create new user
router.route("/").post(registerUser);
//login user

router.route("/login").post(authUser);
//protected route with middleware "admin" - this allows a user with admin rights to update their profile
router.route("/profile").post(protect, admin, updateUserProfile);

module.exports = router;
