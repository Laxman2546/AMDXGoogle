import textModel from './ai/geminiClient.js';
import { buildDecisionPrompt } from './ai/decisionPromptBuilder.js';
import logger from '../utils/logger.js';

export const decisionService = {
  /**
   * Generates a food decision using Vertex AI based on constraints.
   *
   * @param {object} input
   * @param {string} input.time
   * @param {number|string} input.budget
   * @param {'light'|'fitness'|'normal'} input.goal
   * @param {'veg'|'non-veg'} input.dietPreference
   * @returns {Promise<{suggestions: string[], avoid: string[], reason: string}>}
   */
  async generateFoodDecision({ time, budget, goal, dietPreference }) {
    try {
      const prompt = buildDecisionPrompt({ time, budget, goal, dietPreference });
      
      const request = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      };

      const result = await textModel.generateContent(request);
      const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error('No valid response from Gemini model.');
      }

      // Cleanup if the model wraps JSON in markdown blocks despite native JSON setting
      const cleanJsonStr = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      
      const parsedData = JSON.parse(cleanJsonStr);
      return parsedData;

    } catch (error) {
      logger.error('Error generating food decision', { 
        error: error.message, 
        stack: error.stack,
        time, budget, goal, dietPreference
      });

      // Simple fallback
      return getFallbackDecision(dietPreference, goal);
    }
  },
};

/**
 * Basic hardcoded fallback if AI fails to respond or parse.
 */
function getFallbackDecision(dietPreference, goal) {
  const isVeg = dietPreference === 'veg';
  const isFitness = goal === 'fitness';
  
  let suggestions;
  if (isFitness) {
    suggestions = isVeg 
      ? ['Moong Dal Chilla', 'Paneer Tikka Salad', 'Sprouts Chaat']
      : ['Grilled Chicken Tikka', 'Egg White Bhurji', 'Fish Curry (Less Oil)'];
  } else {
    suggestions = isVeg 
      ? ['Dal Makhani with Roti', 'Vegetable Pulao', 'Idli Sambar']
      : ['Chicken Biryani', 'Mutton Curry with Rice', 'Fish Fry'];
  }

  return {
    suggestions,
    avoid: ['Deep fried street food', 'Heavy sweets', 'Carbonated drinks'],
    reason: 'These are general healthy and familiar options based on your constraints.',
  };
}

export default decisionService;
