import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

const server = app.listen(config.port, () => {
  logger.info(`🚀 Server running on port ${config.port} [${config.env}]`);
});

/* ---------- Graceful shutdown (Cloud Run sends SIGTERM) ---------- */

const shutdown = (signal) => {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  // Force exit after 10 s if connections won't drain
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

/* ---------- Catch unhandled errors ---------- */

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', { reason });
  // Let the process manager (Cloud Run) restart us
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});
