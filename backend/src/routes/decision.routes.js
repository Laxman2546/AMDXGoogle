import { Router } from 'express';
import decisionController from '../controllers/decision.controller.js';

const router = Router();

router.post('/', decisionController.generateDecision);

export default router;
