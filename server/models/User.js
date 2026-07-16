const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },

    phone: {
    type: String,
    },

    location: {
    type: String,
    },



    skills: {
      type: [String],
      default: [],
    },

    resume: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
    },

    bio: {
      type: String,
    default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);