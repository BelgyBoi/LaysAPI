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

// =====================
// BAG ROUTES
// =====================
//  see all bags
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

// delete a bag + its votes
router.delete('/bag/:id', auth, adminOnly, async (req, res) => {
  try {
    
    const bagId = req.params.id;

    const bag = await BagModel.findById(bagId);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

    await VoteModel.deleteMany({ bag: bagId });

    await BagModel.findByIdAndDelete(bagId);

    return res.json({ message: 'Bag and related votes deleted' });
  } catch (error) {
    console.error('Error in admin DELETE /bag/:id:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// =====================
// VOTE ROUTES
// =====================
// see overview of ALL votes
router.get('/vote', auth, adminOnly, async (req, res) => {
  try {
    // Find all votes and populate user + bag info
    const votes = await VoteModel
      .find()
      .populate('user', 'firstName lastName email')
      .populate('bag', 'name image');

    return res.json(votes);
  } catch (error) {
    console.error('Error in admin GET /vote:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
