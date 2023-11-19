const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  logoutUser,
} = require("../controller/authController");
const requireAuth = require("../middleware/requireAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(requireAuth, getUserProfile)
  .put(requireAuth, updateUserProfile);

module.exports = router;

