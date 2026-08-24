const EmergencyContact = require('../models/EmergencyContact');

exports.getContacts = async (req, res) => {
  // Ownership check: only ever return contacts belonging to the logged-in user.
  const contacts = await EmergencyContact.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ contacts });
};

exports.createContact = async (req, res) => {
  const { name, phone, relationship } = req.body;

  if (!name || !phone || !relationship) {
    return res.status(400).json({ error: 'name, phone and relationship are required' });
  }

  // The owning user is always derived from the verified JWT (req.user.id),
  // never from the request body — a client can't create a contact "for"
  // someone else.
  const contact = await EmergencyContact.create({
    user: req.user.id,
    name,
    phone,
    relationship
  });

  res.status(201).json({ contact });
};

exports.deleteContact = async (req, res) => {
  // Ownership check: match both _id AND user. If the contact belongs to
  // someone else, this returns null just like a bad id would — a plain
  // 404 either way, no information leaked about who owns it.
  const contact = await EmergencyContact.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  res.status(200).json({ message: 'Contact deleted' });
};