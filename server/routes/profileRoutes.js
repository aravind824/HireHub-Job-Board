const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const {
  uploadResume,
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

// View Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, updateProfile);

module.exports = router;