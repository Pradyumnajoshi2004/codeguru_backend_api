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

    const data = await Job.create(req.body);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.putJob = async (req, res) => {
  try {
    const data = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
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
