const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", protect, authorize("employer"), createJob);

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.put("/:id", protect, authorize("employer"), updateJob);

router.delete("/:id", protect, authorize("employer"), deleteJob);

module.exports = router;