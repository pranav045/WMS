// models/Issue.js (NEW - Create this file to handle issue reports)
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduleId: {
    type: Number,
    required: true
  },
  issueType: {
    type: String,
    required: true,
    enum: ['missed-pickup', 'bin-full', 'wrong-type', 'other']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Issue', issueSchema);