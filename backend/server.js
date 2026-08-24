require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const { initSocket } = require('./routes/socket')

const authRoutes = require('./routes/Auth.route');
const contactRoutes = require('./routes/contacts.route');
const sosRoutes = require('./routes/sos.route.js');
const linkRoutes = require('./routes/links.js');

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/links', linkRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5001;

// Wrap Express in a plain HTTP server so Socket.IO can share the same
// port instead of needing a second server/process.
const httpServer = http.createServer(app);
initSocket(httpServer, CLIENT_ORIGIN);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });