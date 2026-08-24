// Wraps an async route handler so any thrown/rejected error is forwarded
// to Express's error handling instead of crashing the process.
module.exports = function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};