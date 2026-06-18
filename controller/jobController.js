const mongoose = require("mongoose");
const Job = require("../model/jobModel");

exports.getJob = async (req, res) => {
  try {
    const data = await Job.find().populate("userId", "name email");
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.postJob = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ errors: true, message: "User not authenticated" });
    }

    const { companyName, description, role, city, jobType } = req.body;
    
    const isJobExists = await Job.findOne({ companyName, description, role, city, jobType });
    if (isJobExists) {
      return res.status(409).json({ errors: true, message: "The Job Already Exists" });
    }
    
    const jobData = { ...req.body, userId: userId };
    const data = await Job.create(jobData);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

// 🌟 UPDATED: PUT JOB CONTROLLER WITH FIXES
exports.putJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ errors: true, message: "User not authenticated" });
    }
    
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ errors: true, message: "Job not found" });
    }
    
    // Authorization check
    if (existingJob.userId && existingJob.userId.toString() !== userId.toString()) {
      return res.status(403).json({ errors: true, message: "You are not authorized to update this job" });
    }
    
    // ✅ FIX: Strip _id from req.body to prevent Mongoose / Mongo immutable field errors
    const { _id, ...updateFields } = req.body;
    
    const jobData = {
      ...updateFields,
      userId: existingJob.userId || userId // Maintain original ownership
    };

    const data = await Job.findByIdAndUpdate(jobId, jobData, {
      new: true,
      runValidators: true, // Forces Mongoose validation to run on update paths
    }).populate("userId", "name email");
    
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ errors: true, message: "User not authenticated" });
    }
    
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ errors: true, message: "Job not found" });
    }
    
    if (existingJob.userId && existingJob.userId.toString() !== userId.toString()) {
      return res.status(403).json({ errors: true, message: "You are not authorized to delete this job" });
    }
    
    const data = await Job.findByIdAndDelete(jobId);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.jobFindById = async (req, res) => {
  try {
    const data = await Job.findById(req.params.id).populate("userId", "name email");
    if (!data) {
      return res.status(404).json({ errors: true, message: "Job not found" });
    }
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};