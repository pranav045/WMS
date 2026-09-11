// routes/auth.js (UPDATED - Include recyclingGoal in responses)
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Helper function to create JWT token
const createToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'waste_management_secret_key_2024',
    { expiresIn: '24h' }
  );
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    // Validation
    if (!normalizedName || !normalizedEmail || typeof password !== 'string') {
      return res.status(400).json({ 
        message: 'Name, email, and password are required' 
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Provide a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      address: address || {},
      recyclingGoal: 20 // Default goal
    });

    await user.save();
    console.log('User created successfully:', user.email);

    // Create token and send response
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        recyclingGoal: user.recyclingGoal
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: 'User already exists with this email' });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Create token and send response
    const token = createToken(user._id);

    console.log('Login successful:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        recyclingGoal: user.recyclingGoal
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Demo Login (Auto-creates demo user)
router.post('/demo', async (req, res) => {
  try {
    console.log('Demo login attempt');
    
    const demoEmail = 'demo@ecowaste.com';
    const demoPassword = 'demo123';

    // Check if demo user already exists
    let user = await User.findOne({ email: demoEmail });
    
    if (!user) {
      console.log('Creating demo user...');
      
      // Create demo user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(demoPassword, salt);

      user = new User({
        name: 'Demo User',
        email: demoEmail,
        password: hashedPassword,
        address: {
          street: '123 Green Street',
          city: 'Eco City',
          state: 'EC',
          zipCode: '12345'
        },
        recyclingGoal: 20
      });

      await user.save();
      console.log('Demo user created successfully');
    }

    // Create token and send response
    const token = createToken(user._id);

    console.log('Demo login successful');

    res.json({
      success: true,
      message: 'Demo login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        recyclingGoal: user.recyclingGoal
      }
    });

  } catch (error) {
    console.error('Demo login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during demo login',
      error: error.message 
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'waste_management_secret_key_2024'
    );
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        recyclingGoal: user.recyclingGoal
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
});

module.exports = router;
