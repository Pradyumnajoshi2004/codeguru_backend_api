const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  mobNo: {
    type: String,
    default: null,
    trim: true
  },
  isPlaced: {
    type: String,
    enum: ['Yes', 'No', 'Pending'],
    default: 'Pending'
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);