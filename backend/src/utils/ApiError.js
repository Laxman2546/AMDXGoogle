/**
 * Custom API error class with HTTP status codes.
 * Extends the native Error to carry operational metadata
 * that the error-handling middleware can use to build responses.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message    - Human-readable error message
   * @param {object} [options]
   * @param {boolean} [options.isOperational=true] - Whether the error is expected (vs. a bug)
   * @param {Array}   [options.errors]             - Validation-level detail array
   */
  constructor(statusCode, message, { isOperational = true, errors = [] } = {}) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  /* ---------- Convenience factories ---------- */

  static badRequest(message = 'Bad request', errors = []) {
    return new ApiError(400, message, { errors });
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message, { isOperational: false });
  }
}
