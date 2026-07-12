const Job = require("../models/Job");
const Application = require("../models/Application");


// Employer Dashboard
exports.getEmployerDashboard = async (req, res) => {
  try {
    // Find all jobs posted by the logged-in employer
    const jobs = await Job.find({ postedBy: req.user.id });

    const dashboard = [];

    // Count applications for each job
    for (const job of jobs) {
      const applicationCount = await Application.countDocuments({
        job: job._id,
      });

      dashboard.push({
        jobId: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        applications: applicationCount,
      });
    }

    res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      jobs: dashboard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get all jobs posted by this employer
    const jobs = await Job.find({ postedBy: req.user.id });

    const jobIds = jobs.map((job) => job._id);

    // Total applications
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // Status counts
    const pending = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Pending",
    });

    const reviewed = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Reviewed",
    });

    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
    });

    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalJobs: jobs.length,
        totalApplications,
        pending,
        reviewed,
        accepted,
        rejected,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};