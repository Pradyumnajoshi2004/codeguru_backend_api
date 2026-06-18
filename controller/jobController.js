const mongoose = require("mongoose");
const Job = require("../model/jobModel");
const { JsonWebTokenError } = require("jsonwebtoken");

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
    // ✅ Ensure userId is a string
    
    
    const userId = req.user?._id ;

    
    if (!userId) {
      return res.status(401).json({ 
        errors: true, 
        message: "User not authenticated" 
      });
    }

    const { companyName, description, role, city, jobType } = req.body;
    
    const isJobExists = await Job.findOne({
      companyName,
      description,
      role,
      city,
      jobType,
    });
    
    if (isJobExists) {
      return res
        .status(409)
        .json({ errors: true, message: "The Job Already Exists" });
    }
    
    const jobData = {
      ...req.body,
      userId: userId
    };
    
    const data = await Job.create(jobData);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.putJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ 
        errors: true, 
        message: "User not authenticated" 
      });
    }
    
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ 
        errors: true, 
        message: "Job not found" 
      });
    }
    

    const jobUserId = existingJob.userId ? existingJob.userId.toString() : null;
    const currentUserId = userId.toString();
    
    if (jobUserId && jobUserId !== currentUserId) {
      return res.status(403).json({ 
        errors: true, 
        message: "You are not authorized to update this job" 
      });
    }
    
    const { _id, ...updateFields } = req.body;
    
    const jobData = {
      ...updateFields,
      userId: existingJob.userId || userId
    };

    const data = await Job.findByIdAndUpdate(jobId, jobData, {
      new: true,
    })
    
    return res.json({ errors: false, data: data });
  } catch (error) {
    console.error("Put job error:", error);
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    // ✅ Ensure userId is a string
    const userId = req.user?._id ? req.user._id.toString() : null;
    
    if (!userId) {
      return res.status(401).json({ 
        errors: true, 
        message: "User not authenticated" 
      });
    }
    
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ 
        errors: true, 
        message: "Job not found" 
      });
    }
    
    // ✅ Ensure both are strings for comparison
    const jobUserId = existingJob.userId ? existingJob.userId.toString() : null;
    const currentUserId = userId.toString();
    
    if (jobUserId && jobUserId !== currentUserId) {
      return res.status(403).json({ 
        errors: true, 
        message: "You are not authorized to delete this job" 
      });
    }
    
    const data = await Job.findByIdAndDelete(jobId);
    return res.json({ errors: false, data: data });
  } catch (error) {
    console.error("Delete job error:", error);
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.jobFindById = async (req, res) => {
  try {
    const data = await Job.findById(req.params.id).populate("userId", "name email");
    
    if (!data) {
      return res.status(404).json({ 
        errors: true, 
        message: "Job not found" 
      });
    }
    
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};