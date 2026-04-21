import decisionService from '../services/decision.service.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const decisionController = {
  /** POST /decision */
  generateDecision: asyncHandler(async (req, res) => {
    const { time, budget, goal, dietPreference } = req.body;

    // Simple validation
    if (!time || typeof time !== 'string') {
      throw ApiError.badRequest('time is required and must be a string (e.g., "morning")');
    }
    if (budget === undefined) {
      throw ApiError.badRequest('budget is required');
    }
    if (!['light', 'fitness', 'normal'].includes(goal)) {
      throw ApiError.badRequest('goal must be one of: light, fitness, normal');
    }
    if (!['veg', 'non-veg'].includes(dietPreference)) {
      throw ApiError.badRequest('dietPreference must be one of: veg, non-veg');
    }

    // Call service layer
    const decision = await decisionService.generateFoodDecision({
      time,
      budget,
      goal,
      dietPreference,
    });

    res.status(200).json(decision);
  }),
};

export default decisionController;
