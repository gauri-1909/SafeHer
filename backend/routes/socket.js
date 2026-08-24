const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');

let io = null;

function initSocket(httpServer, clientOrigin) {
  io = new Server(httpServer, {
    cors: { origin: clientOrigin }
  });

  // Authenticate the socket the same way we authenticate REST requests —
  // the frontend passes the JWT when connecting.
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Not authorized'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Not authorized'));
    }
  });

  io.on('connection', (socket) => {
    // Each user gets a private room keyed by their own id. To alert a
    // linked user, the server just emits to `user:<theirId>` — it doesn't
    // need to track socket ids, handle multiple tabs, etc.
    socket.join(`user:${socket.userId}`);

    socket.on('disconnect', () => {
      // socket.io automatically leaves all rooms on disconnect.
    });
  });

  return io;
}

// Broadcast an SOS alert to every linked user's room.
function emitSOSAlert(linkedUserIds, payload) {
  if (!io) return;
  linkedUserIds.forEach((userId) => {
    io.to(`user:${userId}`).emit('sos-alert', payload);
  });
}

// Broadcast a "resolved" update the same way, so a linked user's screen
// updates in real time when the emergency is over.
function emitSOSResolved(linkedUserIds, payload) {
  if (!io) return;
  linkedUserIds.forEach((userId) => {
    io.to(`user:${userId}`).emit('sos-resolved', payload);
  });
}

module.exports = { initSocket, emitSOSAlert, emitSOSResolved };