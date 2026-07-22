const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  applyJob,
  getApplicants,
  getApplicantsByJob,
  getMyApplications,
  updateApplicationStatus,
  
} = require("../controllers/applicationController");


// Job Seeker applies for a job
router.post("/:jobId", protect, authorize("jobseeker"), applyJob);

// Job Seeker views their own applications
router.get("/my", protect, authorize("jobseeker"), getMyApplications);

// Employer views applicants for a job
router.get("/applicants/:jobId", protect, authorize("employer"), getApplicants);


// Employer updates application status
router.put("/status/:applicationId", protect, authorize("employer"), updateApplicationStatus);

module.exports = router;