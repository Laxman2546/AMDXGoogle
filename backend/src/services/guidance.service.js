import { collections } from '../config/firebase.js';
import textModel from './ai/geminiClient.js';
import { buildGuidancePrompt } from './ai/promptBuilder.js';
import { guidanceResponseSchema } from '../schemas/guidance.schema.js';
import logger from '../utils/logger.js';
import { ApiError } from '../utils/ApiError.js';

export const guidanceService = {
  /**
   * Generates or retrieves condition-based food guidance.
   *
   * @param {object} input
   * @param {string} input.condition
   * @param {'veg'|'non-veg'} input.dietPreference
   * @param {'en'|'te'|'hi'} input.language
   * @returns {Promise<import('../schemas/guidance.schema.js').GuidanceResponse>}
   */
  async generateConditionGuidance({ condition, dietPreference, language }) {
    // 1. Generate cache key (sanitized)
    const sanitizedCondition = condition.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
    const cacheKey = `${sanitizedCondition}_${dietPreference}_${language}`;

    try {
      // 2. Check Firestore cache
      const cacheRef = collections.guidanceCache.doc(cacheKey);
      const doc = await cacheRef.get();

      if (doc.exists) {
        logger.info(`Cache hit for condition: ${condition} [${cacheKey}]`);
        return doc.data();
      }

      logger.info(`Cache miss for condition: ${condition} [${cacheKey}]. Pinging Gemini...`);

      // 3. Build prompt and call Vertex AI
      const prompt = buildGuidancePrompt({ condition, dietPreference, language });
      const request = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      };

      const result = await textModel.generateContent(request);
      const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error('No valid response from Gemini model.');
      }

      // 4. Parse and Validate Response via Zod
      // Fallback cleanup if the model still wraps JSON in markdown blocks despite native JSON setting
      const cleanJsonStr = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const rawJson = JSON.parse(cleanJsonStr);
      
      const validatedData = guidanceResponseSchema.parse(rawJson);

      // 5. Cache the successful result asynchronously (fire & proceed)
      cacheRef.set(validatedData).catch((err) => {
        logger.error(`Failed to cache response for ${cacheKey}`, { error: err.message });
      });

      return validatedData;

    } catch (error) {
      logger.error('Error generating condition guidance', { 
        error: error.message, 
        stack: error.stack,
        condition 
      });

      // 6. Graceful Degradation / Fallback logic
      return getFallbackGuidance(condition);
    }
  },
};

/**
 * Basic hardcoded fallback if AI/Database fails to ensure the API never drops
 * a crucial request completely.
 */
function getFallbackGuidance(condition) {
  return {
    title: `General dietary advice for ${condition}`,
    eat: ['Easy-to-digest clear soups', 'Khichdi', 'Fresh vegetables', 'Plenty of fluids'],
    avoid: ['Deep fried foods', 'Excessive sugar', 'Spicy foods'],
    tips: ['Stay hydrated', 'Rest well', 'Consult a doctor if symptoms persist'],
    reason: 'Simple, non-irritating foods support the body during physical stress.',
    regional: {
      te: 'సాధారణ ఆహార సలహా',
      hi: 'सामान्य आहार सलाह',
    },
  };
}

export default guidanceService;
