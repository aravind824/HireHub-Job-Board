const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const {
  uploadResume,
  uploadProfileImage,
  getProfile,
  updateProfile,
} = require("../controllers/profileController");


// Upload Resume
router.post(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

// Upload Profile Image
router.post(
  "/image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);      

// View Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, updateProfile);

module.exports = router;