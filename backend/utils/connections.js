const Connection = require('../models/Connection');

// Returns an array of { _id, name, email } for every user linked to
// `userId`, regardless of which side of the connection they're stored on.
async function getLinkedUsers(userId) {
  const connections = await Connection.find({
    $or: [{ userA: userId }, { userB: userId }]
  }).populate('userA userB', 'name email');

  return connections.map((conn) => {
    const other = String(conn.userA._id) === String(userId) ? conn.userB : conn.userA;
    return {
      connectionId: conn._id,
      user: { _id: other._id, name: other.name, email: other.email }
    };
  });
}

module.exports = { getLinkedUsers };