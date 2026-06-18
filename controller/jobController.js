const mongoose = require("mongoose");
const Job = require("../model/jobModel");

exports.getJob = async (req, res) => {
  try {
    const data = await Job.find().populate("userId");
    
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.postJob = async (req, res) => {
  try {
    const userID = req.user?._id;
    const { companyName, description, role, city, jobType } = req.body;
    const isJobExists = await Job.findOne({
      companyName,
      description,
      role,
      city,
      jobType,
    });
    if (isJobExists)
      return res
        .status(409)
        .json({ errors: true, message: "The Job Already Exsits" });
    const jobData = {
      ...req.body,
      userId : userID
    }
    const data = await Job.create(jobData);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.putJob = async (req, res) => {
  try {
    const jobId = req.params.id
    const userId = req.user._id
    const existingJob = await Job.findById(jobId)
    if (!existingJob) {
      return res.status(404).json({ 
        errors: true, 
        message: "Job not found" 
      });
    }
    if (existingJob.userId.toString() !== userId.toString()) {
      return res.status(403).json({ 
        errors: true, 
        message: "You are not authorized to update this job" 
      });
    }

    const data = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
   const jobId = req.params.id;
    const userId = req.user._id;
    
    // ✅ Check if user owns this job
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ 
        errors: true, 
        message: "Job not found" 
      });
    }
    
    // ✅ Verify ownership
    if (existingJob.userId.toString() !== userId.toString()) {
      return res.status(403).json({ 
        errors: true, 
        message: "You are not authorized to delete this job" 
      });
    }
  try {
    const data = await Job.findByIdAndDelete(id);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: false, message: error.message });
  }
};

exports.jobFindById = async (req, res) => {
  try {
    const data = await Job.findById(req.params.id);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: false, messag: error.message });
  }
};
