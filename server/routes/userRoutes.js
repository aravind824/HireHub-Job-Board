const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const { protect } = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  uploadResume,
  uploadProfilePicture,
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);

router.put("/profile",protect,updateProfile);

router.put("/resume", protect,upload.single("resume"),uploadResume);

router.put("/profile-picture",protect,upload.single("profileImage"),uploadProfilePicture);

module.exports = router;