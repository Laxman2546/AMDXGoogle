import { Router } from 'express';
import healthRoutes from './health.routes.js';
import decisionRoutes from './decision.routes.js';

const router = Router();

// Mount route groups
router.use('/healthz', healthRoutes);
router.use('/decision', decisionRoutes);

// Add more route groups here:
// router.use('/api/v1/users', userRoutes);

export default router;
