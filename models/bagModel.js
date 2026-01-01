// Local JS variable for the Mongoose library
const mongoose = require('mongoose');

// Bag = 1 saved configuration of a Lay's bag
const bagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          
    image: { type: String, default: '' },            // preview image URL (optional)
    snapshot: { type: String, default: '' },         // 3D bag snapshot preview (generated)
    bagColor: { type: String, default: '' },         
    font: { type: String, default: '' },             
    pattern: { type: String, default: '' },          
    inspiration: { type: String, default: '' },      
    keyFlavours: { type: [String], default: [] },    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // this automatically adds createdAt + updatedAt
    timestamps: true,
  }
);

// JS variable BagModel = model for the "bags" collection
const BagModel = mongoose.model('Bag', bagSchema, 'bags');

module.exports = BagModel;
