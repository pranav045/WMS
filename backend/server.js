// server.js (UPDATED - Add waste routes)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');
require("./config/transporter");


const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://wmsd-one.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));





app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/waste', require('./routes/waste')); // NEW: Waste routes
app.use('/api/collection', require('./routes/collection'));
app.use('/api/education', require('./routes/education'));

app.use('/api/contact', contactRoutes);
// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});
console.log("DEBUG CHECK");
console.log("process.env.EMAIL_USER =", process.env.EMAIL_USER);
console.log("process.env.EMAIL_PASS =", process.env.EMAIL_PASS);


// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// MongoDB Connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/waste-management';

console.log('Connecting to MongoDB...', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  console.log('💡 TIP: Make sure MongoDB is running on your system');
  console.log('💡 On Windows: run "mongod" in command prompt');
  console.log('💡 On Mac: run "brew services start mongodb-community"');
  console.log('💡 On Linux: run "sudo systemctl start mongod"');
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('✅ MongoDB connection established');
});

db.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Backend API: http://localhost:${PORT}/api`);
  console.log(`🔍 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
});