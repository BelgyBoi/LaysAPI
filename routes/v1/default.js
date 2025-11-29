const express = require('express');
const router = express.Router();
const BagModel = require('../../models/bagModel');
const UserModel = require('../../models/userModel');
const VoteModel = require('../../models/votesModel');


router.get('/ping', (req, res) => {
    res.send('default router is alive🧠');
});

router.get('/bag', async (req, res) => {
    try {
        const bags = await BagModel.find();
        res.json(bags);
    } catch (error) {
        console.error('Error in GET /bag:', error);
        res.status(500).json({error: 'Server error'})
    }
});

// POST /api/v1/default/bag
// Creates a new bag document in the "bags" collection
router.post('/bag', async (req, res) => {
  try {
    // Pull fields out of the request body (JSON from Postman)
    const {
      name,
      image,
      bagColor,
      font,
      pattern,
      packaging,
      inspiration,
      keyFlavours,
    } = req.body;

    // Basic validation: name + userId are required
    if (!name || !userId) {
      return res.status(400).json({ error: 'name and userId are required' });
    }

    // Create a new bag document in MongoDB
    const newBag = await BagModel.create({
      name: name,
      image: image || '',
      bagColor: bagColor || '',
      font: font || '',
      pattern: pattern || '',
      packaging: packaging || '',
      inspiration: inspiration || '',
      keyFlavours: Array.isArray(keyFlavours) ? keyFlavours : [],
      user: userId, // link to a user in the users collection
    });

    // Respond with 201 Created + the new bag
    res.status(201).json(newBag);
  } catch (error) {
    console.error('Error in POST /bag:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;