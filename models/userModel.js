const mongoose = require('mongoose');

// User = account that can create bags and vote
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    // For the assignment they say "password". In a real app this should be a hash.
    password:  { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema, 'users');

module.exports = UserModel;
