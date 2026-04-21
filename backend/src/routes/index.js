import { Router } from 'express';
import healthRoutes from './health.routes.js';
import decisionRoutes from './decision.routes.js';
import analyzeRoutes from './analyze.routes.js';

const router = Router();

// Mount route groups
router.use('/healthz', healthRoutes);
router.use('/decision', decisionRoutes);
router.use('/analyze', analyzeRoutes);

// Add more route groups here:
// router.use('/api/v1/users', userRoutes);

export default router;
