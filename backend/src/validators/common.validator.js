import { ApiError } from '../utils/ApiError.js';

/**
 * Reusable validation helpers.
 * Add schema-based validation (e.g. Zod, Joi) here as the API grows.
 */

/**
 * Validates that a value is a non-empty string.
 * @param {*} value
 * @param {string} fieldName
 * @throws {ApiError} 400 if validation fails
 */
export function requireString(value, fieldName) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw ApiError.badRequest(`${fieldName} is required and must be a non-empty string`);
  }
}

/**
 * Validates that a value is a positive integer.
 * @param {*} value
 * @param {string} fieldName
 * @throws {ApiError} 400 if validation fails
 */
export function requirePositiveInt(value, fieldName) {
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) {
    throw ApiError.badRequest(`${fieldName} must be a positive integer`);
  }
}
