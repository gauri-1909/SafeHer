const mongoose = require('mongoose');

// Represents a symmetric link between two users (e.g. partners, close
// family). Either side of a connection can see the other's SOS events and
// gets a real-time alert when the other triggers SOS. We store the pair
// once, ordered arbitrarily as userA/userB — "am I part of this
// connection" queries check both fields.
const connectionSchema = new mongoose.Schema({
  userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent the exact same pair being linked twice.
connectionSchema.index({ userA: 1, userB: 1 }, { unique: true });

module.exports = mongoose.model('Connection', connectionSchema);