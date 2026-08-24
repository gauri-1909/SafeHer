const jwt = require('jsonwebtoken');

// Protects a route: requires a valid "Authorization: Bearer <token>" header.
// On success, attaches req.user = { id } so downstream handlers can scope
// all DB queries to the logged-in user.
module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};