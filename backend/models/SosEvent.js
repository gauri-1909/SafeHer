const mongoose = require('mongoose');

const sosEventSchema = new mongoose.Schema({
  // Same ownership rule as EmergencyContact: always filter by
  // `user: req.user.id` in queries, never trust a client-supplied user id.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  },
  triggeredAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date, default: null }
});

module.exports = mongoose.model('SOSEvent', sosEventSchema);