const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/userModel');
const BagModel = require('../../models/bagModel');
const VoteModel = require('../../models/votesModel');
const { auth } = require('../../middleware/authMiddleware');

// =====================
// TEST ROUTE
// =====================

router.get('/ping', (req, res) => {
  res.send('default router is alive 🧠');
});

// =====================
// USER ROUTES
// =====================

// POST /api/v1/default/user
// Register a new normal user (role: "user")
router.post('/user', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email already exists
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      role: 'user',
    });

    res.status(201).json({
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error('Error in POST /user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/v1/default/user/auth
// Login: return JWT token if email + password are correct
router.post('/user/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Token payload
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in POST /user/auth:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/v1/default/user/:id
// Get details of ONE user (must be logged in and either same user or admin)
router.get('/user/:id', auth, async (req, res) => {
  try {
    const requestedId = req.params.id;

    if (req.user.id !== requestedId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const user = await UserModel.findById(requestedId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in GET /user/:id:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export the router so app.js can use it
module.exports = router;
