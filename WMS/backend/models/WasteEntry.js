// models/WasteEntry.js (NEW FILE)
const mongoose = require('mongoose');

const wasteEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wasteType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1
  },
  unit: {
    type: String,
    enum: ['kg', 'lb', 'items', 'liters'],
    default: 'kg'
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  disposalMethod: {
    type: String,
    enum: ['recycling', 'composting', 'landfill', 'incineration', 'donation', 'reuse'],
    default: 'recycling'
  },
  location: {
    type: String,
    enum: ['home', 'office', 'public', 'other'],
    default: 'home'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WasteEntry', wasteEntrySchema);