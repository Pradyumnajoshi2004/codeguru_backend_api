const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyAddress: {
    type: String,
    required: true,
    trim: true
  },
  companyEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    default: ''
  },
  websiteLink: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  companyNumber: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref:'User',
    required:true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('job', jobSchema);