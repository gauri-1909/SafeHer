const crypto = require('crypto');
const LinkCode = require('../models/LinkCode');
const Connection = require('../models/Connection.js');
const { getLinkedUsers } = require('../utils/connections');

const CODE_TTL_MINUTES = 15;

function generateCode() {
  // 6-character, easy-to-read code (uppercase letters + digits, no
  // ambiguous characters like 0/O or 1/I).
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[crypto.randomInt(chars.length)];
  }
  return code;
}

exports.createLinkCode = async (req, res) => {
  // Clear out any previous unused code for this user so there's only ever
  // one active code at a time — keeps things simple to reason about.
  await LinkCode.deleteMany({ user: req.user.id });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

  await LinkCode.create({ code, user: req.user.id, expiresAt });

  res.status(201).json({ code, expiresAt });
};

exports.redeemLinkCode = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'code is required' });
  }

  const linkCode = await LinkCode.findOne({ code: code.toUpperCase().trim() });

  if (!linkCode || linkCode.expiresAt < new Date()) {
    return res.status(400).json({ error: 'This code is invalid or has expired.' });
  }

  if (String(linkCode.user) === String(req.user.id)) {
    return res.status(400).json({ error: 'You cannot link to your own account.' });
  }

  // Avoid creating a duplicate connection if these two are already linked.
  const existing = await Connection.findOne({
    $or: [
      { userA: linkCode.user, userB: req.user.id },
      { userA: req.user.id, userB: linkCode.user }
    ]
  });

  if (!existing) {
    await Connection.create({ userA: linkCode.user, userB: req.user.id });
  }

  // Single-use — remove the code once redeemed.
  await LinkCode.deleteOne({ _id: linkCode._id });

  res.status(200).json({ message: 'Accounts linked successfully.' });
};

exports.getConnections = async (req, res) => {
  const linked = await getLinkedUsers(req.user.id);
  res.status(200).json({ connections: linked });
};

exports.removeConnection = async (req, res) => {
  // Ownership check: only delete a connection this user is actually part of.
  const result = await Connection.findOneAndDelete({
    _id: req.params.id,
    $or: [{ userA: req.user.id }, { userB: req.user.id }]
  });

  if (!result) {
    return res.status(404).json({ error: 'Connection not found' });
  }

  res.status(200).json({ message: 'Connection removed' });
};