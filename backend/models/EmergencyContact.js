const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  // Every contact belongs to exactly one user. Every route touching this
  // model MUST filter by `user: req.user.id`, never by _id alone.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  relationship: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);