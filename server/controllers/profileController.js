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

exports.getProfile = async (req, res) => {};

exports.updateProfile = async (req, res) => {};