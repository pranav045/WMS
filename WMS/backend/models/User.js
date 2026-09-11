// models/User.js (UPDATED - Add recyclingGoal field)
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
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'collector'],
    default: 'user'
  },
  recyclingGoal: {
    type: Number,
    default: 20
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);