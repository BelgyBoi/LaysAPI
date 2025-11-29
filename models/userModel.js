const mongoose = require('mongoose');

// User = account that can create bags and vote
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema, 'users');

module.exports = UserModel;
