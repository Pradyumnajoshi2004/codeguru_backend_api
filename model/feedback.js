const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return !isNaN(v) && v >= 1 && v <= 5;
      },
      message: 'Rating must be between 1 and 5'
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  phoneNo: {
    type: String,
    default: null,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);