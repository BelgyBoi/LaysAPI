// Local JS variable for the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Middleware: checks if a valid JWT token is present
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Expect header: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user info on the request (local JS object)
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next(); // continue to the route handler
  } catch (err) {
    console.error('auth middleware error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Middleware: only allow admins (we'll use this later in admin routes)
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
}

module.exports = { auth, adminOnly };
