const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  displayName: { type: String },
  bio: { type: String },
  availability: { type: String },
  // gender: { type: String },
  // dob: { type: Date },
  location: {
    country: { type: String, required: true },
    state: { type: String },
    city: { type: String, required: true },
  },
  posts: { type: Array },
  belay: { type: Boolean },
  lead: { type: Boolean },
  skill: {
    bouldering: { type: String },
    rope: { type: String },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
