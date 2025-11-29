const mongoose = require('mongoose');

// Vote = a user voting for a specific bag
const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bag',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // only care about createdAt
  }
);

const VoteModel = mongoose.model('Vote', voteSchema, 'votes');

module.exports = VoteModel;
