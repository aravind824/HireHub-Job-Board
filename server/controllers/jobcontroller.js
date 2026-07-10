const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {};

exports.getJobById = async (req, res) => {};

exports.updateJob = async (req, res) => {};

exports.deleteJob = async (req, res) => {};