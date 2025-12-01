const jwt = require('jsonwebtoken');

// =====================
// AUTHENTICATION FUNCTION
// =====================
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error('auth middleware error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// =====================
// ADMIN ONLY FUNCTION
// =====================
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }
  next();
}

module.exports = { auth, adminOnly };
