const SOSEvent = require('../models/SosEvent');
const User = require('../models/User');
const { getLinkedUsers } = require('../utils/connections');
const { emitSOSAlert, emitSOSResolved } = require('../routes/socket');

exports.triggerSOS = async (req, res) => {
  const { lat, lng } = req.body;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'lat and lng (numbers) are required' });
  }

  const event = await SOSEvent.create({
    user: req.user.id,
    location: { lat, lng },
    status: 'active'
  });

  // Notify everyone linked to this account, in real time, via their own
  // private socket room. This never touches SMS/email — it's purely an
  // in-app event for anyone with SafeHer open right now.
  const linkedUsers = await getLinkedUsers(req.user.id);
  if (linkedUsers.length > 0) {
    const triggeringUser = await User.findById(req.user.id).select('name');
    emitSOSAlert(
      linkedUsers.map((u) => u.user._id),
      {
        event,
        triggeredBy: { _id: req.user.id, name: triggeringUser?.name || 'Someone' }
      }
    );
  }

  res.status(201).json({ event });
};

exports.getSOSHistory = async (req, res) => {
  const events = await SOSEvent.find({ user: req.user.id }).sort({ triggeredAt: -1 });
  res.status(200).json({ events });
};

exports.resolveSOS = async (req, res) => {
  const event = await SOSEvent.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { status: 'resolved', resolvedAt: new Date() },
    { new: true }
  );

  if (!event) {
    return res.status(404).json({ error: 'SOS event not found' });
  }

  const linkedUsers = await getLinkedUsers(req.user.id);
  if (linkedUsers.length > 0) {
    emitSOSResolved(
      linkedUsers.map((u) => u.user._id),
      { event, resolvedBy: { _id: req.user.id } }
    );
  }

  res.status(200).json({ event });
};

// New: view a linked user's SOS history — the actual "partner can see
// what phase they're in" equivalent for this app. Only works if the two
// users are genuinely connected (checked via getLinkedUsers), never by
// guessing a user id.
exports.getLinkedUserSOSHistory = async (req, res) => {
  const linkedUsers = await getLinkedUsers(req.user.id);
  const isLinked = linkedUsers.some((u) => String(u.user._id) === req.params.userId);

  if (!isLinked) {
    return res.status(403).json({ error: 'You are not linked to this account.' });
  }

  const events = await SOSEvent.find({ user: req.params.userId }).sort({ triggeredAt: -1 });
  res.status(200).json({ events });
};