import { Router } from 'express';
import guidanceController from '../controllers/guidance.controller.js';

const router = Router();

router.post('/condition', guidanceController.analyzeCondition);

export default router;
