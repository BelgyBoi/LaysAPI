const express = require('express');
const router = express.Router();
const UserModel = require('../../models/userModel');
const BagModel = require('../../models/bagModel');
const VoteModel = require('../../models/votesModel');
const { auth, adminOnly } = require('../../middleware/authMiddleware');

router.get('/ping', (req, res) => {
    res.send('I am Rodney the mod, I like discord kittens😺');
});

router.get('/bag', auth, adminOnly, async(res, req) => {
    try{
        const bags = await bagModel.find();
        res.json(bags);
    } catch(error) {
        console.error('Error in admin GET /bag:', error);
        res.status(500).json({ error:"Server error"});
    }

});
module.exports = router;