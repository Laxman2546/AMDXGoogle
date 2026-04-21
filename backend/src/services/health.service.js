import config from '../config/index.js';

/**
 * Service layer for health check logic.
 * Add downstream dependency checks (DB, cache, queues) here.
 */
const healthService = {
  /**
   * Returns overall service health status.
   * @returns {{ status: string, environment: string, uptime: number, timestamp: string }}
   */
  getStatus() {
    return {
      status: 'ok',
      environment: config.env,
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  },
};

export default healthService;
