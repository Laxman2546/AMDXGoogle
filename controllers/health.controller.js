import healthService from '../services/health.service.js';

/**
 * Health-check controller.
 * Cloud Run uses this endpoint for liveness / readiness probes.
 */
const healthController = {
  /** GET /healthz */
  check(_req, res) {
    const status = healthService.getStatus();
    res.status(200).json(status);
  },
};

export default healthController;
