const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // LET THE REQUEST PASS SILENTLY IF NO TOKEN
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    req.userId = null; // Let frontend know: user is guest
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "waste_management_secret_key_2024");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    req.userId = null;
    return next(); // Do NOT block with 401 because frontend calls /auth/me to check login status
  }
};

module.exports = auth;
