const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mongoose = require('mongoose'); // For ObjectId
const Reminder = require('../models/Reminder');
const Issue = require('../models/Issue');
const User = require('../models/User');

// Mock collection points (unchanged)
const collectionPoints = [
  {
    id: 1,
    name: "Downtown Recycling Center",
    address: "123 Main Street, Eco City",
    types: ["plastic", "paper", "glass", "metal"],
    hours: "8:00 AM - 6:00 PM",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    capacity: 65,
    waitTime: "5 min"
  },
  {
    id: 2,
    name: "Northside E-waste Facility",
    address: "456 Oak Avenue, Green District",
    types: ["electronic", "batteries"],
    hours: "9:00 AM - 5:00 PM",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    capacity: 45,
    waitTime: "10 min"
  },
  {
    id: 3,
    name: "Community Compost Site",
    address: "789 Park Road, Sustainable Ville",
    types: ["organic"],
    hours: "7:00 AM - 7:00 PM",
    coordinates: { lat: 40.7282, lng: -73.7949 },
    capacity: 85,
    waitTime: "2 min"
  }
];

router.get('/points', (req, res) => {
  res.json(collectionPoints);
});

router.get('/schedule', auth, async (req, res) => {
  try {
    console.log('=== SCHEDULE FETCH === UserId from auth:', req.userId); // Debug
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized - No user ID' });
    }

    const user = await User.findById(req.userId).select('address');
    if (!user) {
      console.log('User not found for ID:', req.userId); // Debug
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user.address?.city); // Debug

    const userCity = user.address?.city || 'Eco City';
    const now = new Date();
    let schedule = [
      {
        id: 1,
        area: "Downtown",
        nextPickup: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        frequency: "Weekly",
        types: ["Recycling", "General Waste"],
        status: "scheduled",
        estimatedTime: "6:00 AM - 8:00 AM"
      },
      {
        id: 2,
        area: "Northside",
        nextPickup: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        frequency: "Bi-weekly",
        types: ["All Types"],
        status: "confirmed",
        estimatedTime: "7:00 AM - 9:00 AM"
      },
      {
        id: 3,
        area: "Sustainable Ville",
        nextPickup: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        frequency: "Monthly",
        types: ["Organic", "E-waste"],
        status: "pending",
        estimatedTime: "5:00 AM - 7:00 AM"
      }
    ];

    // Filter by user area
    const cityToAreaMap = {
      'Eco City': 'Downtown',
      'Green District': 'Northside',
      'Sustainable Ville': 'Sustainable Ville'
    };
    const userArea = cityToAreaMap[userCity] || 'Downtown';
    schedule = schedule.filter(item => item.area === userArea || userArea === 'Downtown');
    console.log('Filtered schedule sent:', schedule.length, 'items'); // Debug

    res.json(schedule);
  } catch (error) {
    console.error('=== SCHEDULE ERROR ===', error.message, error.stack); // Debug
    res.status(500).json({ message: 'Server error fetching schedule', error: error.message });
  }
});

// POST /collection/set-reminder
router.post('/set-reminder', auth, async (req, res) => {
  try {
    console.log('=== SET REMINDER === UserId:', req.userId, 'Body:', req.body); // Debug
    const { scheduleId, reminderTime, nextPickup } = req.body;
    if (!req.userId || !scheduleId || !reminderTime || !nextPickup) {
      console.log('Missing fields in reminder request'); // Debug
      return res.status(400).json({ message: 'Missing required fields: userId, scheduleId, reminderTime, nextPickup' });
    }

    // Convert userId to ObjectId if it's a string
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(401).json({ message: 'Invalid user session' });
    }
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const pickupDate = new Date(nextPickup);
    if (isNaN(pickupDate.getTime())) {
      return res.status(400).json({ message: 'Invalid nextPickup date' });
    }

    const hoursBefore = Number(reminderTime);
    if (!Number.isFinite(hoursBefore) || hoursBefore < 0 || hoursBefore > 24 * 30) {
      return res.status(400).json({ message: 'Invalid reminder time' });
    }
    const scheduledFor = new Date(pickupDate.getTime() - hoursBefore * 60 * 60 * 1000);

    const reminder = new Reminder({
      userId: userObjectId,
      scheduleId: parseInt(scheduleId), // Ensure number
      scheduledFor,
      createdAt: new Date()
    });

    const savedReminder = await reminder.save();
    console.log('=== REMINDER SAVED === ID:', savedReminder._id, 'For user:', userObjectId); // Debug

    res.json({ 
      success: true, 
      reminderId: savedReminder._id.toString(), 
      scheduledFor: scheduledFor.toISOString() 
    });
  } catch (error) {
    console.error('=== REMINDER ERROR ===', error.message, error.stack); // Debug
    res.status(500).json({ message: 'Failed to set reminder', error: error.message });
  }
});

// POST /collection/report-issue
router.post('/report-issue', auth, async (req, res) => {
  try {
    console.log('=== REPORT ISSUE === UserId:', req.userId, 'Body:', req.body); // Debug
    const { scheduleId, issueType, description } = req.body;
    if (!req.userId || !scheduleId || !issueType || !description) {
      console.log('Missing fields in issue request'); // Debug
      return res.status(400).json({ message: 'Missing required fields: userId, scheduleId, issueType, description' });
    }

    // Convert userId to ObjectId if it's a string
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(401).json({ message: 'Invalid user session' });
    }
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const issue = new Issue({
      userId: userObjectId,
      scheduleId: parseInt(scheduleId), // Ensure number
      issueType,
      description: description.trim(),
      status: 'open',
      createdAt: new Date()
    });

    const savedIssue = await issue.save();
    console.log('=== ISSUE SAVED === ID:', savedIssue._id, 'For user:', userObjectId); // Debug

    res.json({ 
      success: true, 
      ticketId: savedIssue._id.toString() 
    });
  } catch (error) {
    console.error('=== ISSUE ERROR ===', error.message, error.stack); // Debug
    res.status(500).json({ message: 'Failed to report issue', error: error.message });
  }
});

module.exports = router;
