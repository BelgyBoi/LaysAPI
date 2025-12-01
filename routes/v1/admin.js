const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../../middleware/authMiddleware');
const UserModel = require('../../models/userModel');
const BagModel = require('../../models/bagModel');
const VoteModel = require('../../models/votesModel');

// =====================
// TEST ROUTE
// =====================
router.get('/ping', (req, res) => {
    return  res.send('I am Rodney the mod, I like discord kittens😺');
});

// Only admins can see all bags
router.get('/bag', auth, adminOnly, async (req, res) => {
  try {
    // Just to debug what res is:
    console.log('admin GET /bag -> typeof res.status:', typeof res.status);

    const bags = await BagModel.find();

    return res.json(bags);
  } catch (error) {
    console.error('Error in admin GET /bag:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
