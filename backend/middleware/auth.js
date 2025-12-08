const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Skip token check for CORS preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'waste_management_secret_key_2024');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
