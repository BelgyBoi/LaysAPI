// Local JS variable for the Mongoose library
const mongoose = require('mongoose');

// Bag = 1 saved configuration of a Lay's bag
const bagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // name of the bag/config
    image: { type: String, default: '' },            // uploaded design image (user upload)
    snapshot: { type: String, default: '' },         // 3D bag snapshot preview (generated)
    bagColor: { type: String, default: '' },         // main color (e.g. "#FFD200")
    font: { type: String, default: '' },             // font key/name
    pattern: { type: String, default: '' },          // pattern key ("stripes", "dots", ...)
    packaging: { type: String, default: '' },        // type of packaging
    inspiration: { type: String, default: '' },      // description / story
    keyFlavours: { type: [String], default: [] },    // list of flavour keys / names

    // reference to the user who created this bag
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
