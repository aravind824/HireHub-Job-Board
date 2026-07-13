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



exports.getAllJobs = async (req, res) => {
  try {
    // Search & Filter
    const keyword = req.query.keyword || "";
    const location = req.query.location || "";
    const company = req.query.company || "";
    const jobType = req.query.jobType || "";

    const minSalary = Number(req.query.minSalary) || 0;
    const maxSalary = Number(req.query.maxSalary) || Number.MAX_SAFE_INTEGER;

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // Sorting
    const sort = req.query.sort || "newest";

    let sortOption = {};

    switch (sort) {
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "salary-high":
        sortOption = { salary: -1 };
        break;
      case "salary-low":
        sortOption = { salary: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // MongoDB Query
    const query = {};

    if (keyword) {
      query.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (company) {
      query.company = {
        $regex: company,
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    query.salary = {
      $gte: minSalary,
      $lte: maxSalary,
    };

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
   



exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};