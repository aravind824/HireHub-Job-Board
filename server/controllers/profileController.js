const User = require("../models/User");

exports.uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ⭐ Add this new function
exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    user.profileImage = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {};