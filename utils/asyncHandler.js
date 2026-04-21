/**
 * Wraps an async Express route handler so that rejected promises
 * are forwarded to Express's error-handling middleware automatically.
 *
 * Usage:
 *   router.get('/items', asyncHandler(async (req, res) => { ... }));
 *
 * @param {Function} fn - Async request handler (req, res, next) => Promise
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
