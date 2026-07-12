const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getEmployerDashboard,
  getDashboardStats,
} = require("../controllers/dashboardController");

// Employer Dashboard
router.get(
  "/employer",
  protect,
  authorize("employer"),
  getEmployerDashboard
);

// Dashboard Statistics
router.get(
  "/stats",
  protect,
  authorize("employer"),
  getDashboardStats
);

module.exports = router;