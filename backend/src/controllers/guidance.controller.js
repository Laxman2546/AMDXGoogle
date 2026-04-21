import guidanceService from '../services/guidance.service.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const guidanceController = {
  /** POST /analyze/condition */
  analyzeCondition: asyncHandler(async (req, res) => {
    const { condition, dietPreference, language } = req.body;

    if (!condition || typeof condition !== 'string') {
      throw ApiError.badRequest('condition is required');
    }
    if (!['veg', 'non-veg'].includes(dietPreference)) {
      throw ApiError.badRequest('dietPreference must be one of: veg, non-veg');
    }
    if (!['en', 'hi', 'te'].includes(language)) {
      throw ApiError.badRequest('language must be one of: en, hi, te');
    }

    const advice = await guidanceService.generateConditionGuidance({
      condition,
      dietPreference,
      language,
    });

    res.status(200).json(advice);
  }),
};

export default guidanceController;
