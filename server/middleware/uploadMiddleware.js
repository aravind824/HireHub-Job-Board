const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (file.fieldname === "resume") {
      uploadPath = path.join(__dirname, "..", "uploads", "resumes");
    } else if (file.fieldname === "profileImage") {
      uploadPath = path.join(__dirname, "..", "uploads", "profiles");
    } else {
      return cb(new Error("Invalid file field"));
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    if (file.mimetype === "application/pdf") {
      return cb(null, true);
    }
    return cb(new Error("Only PDF resumes are allowed"), false);
  }

  if (file.fieldname === "profileImage") {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }
    return cb(new Error("Only image files are allowed"), false);
  }

  cb(new Error("Invalid file field"), false);
};

module.exports = multer({
  storage,
  fileFilter,
});