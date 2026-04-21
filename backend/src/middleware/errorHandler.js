import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Global Express error-handling middleware.
 * Must have 4 parameters so Express recognises it as an error handler.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational ?? false;

  // Log the full error in production; include stack in dev
  if (!isOperational || statusCode >= 500) {
    logger.error(err.message, {
      statusCode,
      stack: err.stack,
      errors: err.errors,
    });
  } else {
    logger.warn(err.message, { statusCode });
  }

  const response = {
    status: 'error',
    statusCode,
    message: config.isProduction && !isOperational ? 'Internal server error' : err.message,
  };

  // Attach validation details when available
  if (err.errors?.length) {
    response.errors = err.errors;
  }

  // Include stack trace only in development
  if (!config.isProduction) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
