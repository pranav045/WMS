const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "waste_management_secret_key_2024");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = auth;
