import { collections } from '../config/firebase.js';
import textModel from './ai/geminiClient.js';
import { buildGuidancePrompt } from './ai/promptBuilder.js';
import { guidanceResponseSchema } from '../schemas/guidance.schema.js';
import logger from '../utils/logger.js';

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
    const sanitizedCondition = condition.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
    const cacheKey = `${sanitizedCondition}_${dietPreference}_${language}`;

    try {
      // 1. Check Firestore cache (only if available)
      if (collections.guidanceCache) {
        try {
          const doc = await collections.guidanceCache.doc(cacheKey).get();
          if (doc.exists) {
            logger.info(`Cache hit for condition: ${condition} [${cacheKey}]`);
            return doc.data();
          }
        } catch (cacheErr) {
          logger.warn(`Firestore read failed, skipping cache: ${cacheErr.message}`);
        }
      }

      logger.info(`Generating guidance for: ${condition} [${cacheKey}]`);

      // 2. Build prompt and call Gemini
      const prompt = buildGuidancePrompt({ condition, dietPreference, language });
      const request = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      };

      const result = await textModel.generateContent(request);
      const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error('No valid response from Gemini model.');
      }

      // 3. Parse and validate
      const cleanJsonStr = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const rawJson = JSON.parse(cleanJsonStr);
      const validatedData = guidanceResponseSchema.parse(rawJson);

      // 4. Cache result if Firestore is available
      if (collections.guidanceCache) {
        collections.guidanceCache.doc(cacheKey).set(validatedData).catch((err) => {
          logger.warn(`Cache write failed for ${cacheKey}: ${err.message}`);
        });
      }

      return validatedData;

    } catch (error) {
      logger.error('Error generating condition guidance', {
        error: error.message,
        stack: error.stack,
        condition,
      });

      return getFallbackGuidance(condition);
    }
  },
};

/**
 * Safe fallback if AI or database fails.
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
