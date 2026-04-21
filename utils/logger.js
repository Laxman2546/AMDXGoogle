import { createLogger, format, transports } from 'winston';
import config from '../config/index.js';

const { combine, timestamp, errors, json, colorize, printf } = format;

/**
 * Structured JSON logger for production (Cloud Run / Cloud Logging).
 * Human-readable colorized output for local development.
 */

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ timestamp: ts, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${ts} ${level}: ${stack || message}${metaStr}`;
  }),
);

const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json(),
);

const logger = createLogger({
  level: config.logLevel,
  format: config.isProduction ? prodFormat : devFormat,
  transports: [new transports.Console()],
  // Prevent winston from exiting on uncaught exceptions
  exitOnError: false,
});

export default logger;
