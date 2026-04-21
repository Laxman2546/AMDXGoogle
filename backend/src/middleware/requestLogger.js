import morgan from 'morgan';
import config from '../config/index.js';

/**
 * HTTP request logger middleware.
 * - 'combined' format in production (for structured log analysis)
 * - 'dev' format locally (concise, colorized)
 */
const requestLogger = morgan(config.isProduction ? 'combined' : 'dev');

export default requestLogger;
