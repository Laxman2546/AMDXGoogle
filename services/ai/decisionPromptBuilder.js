/**
 * Constructs the contextual prompt for Vertex AI for food decision making.
 * 
 * @param {object} params
 * @param {string} params.time - Time of day (e.g., "morning", "night", "2:00 PM")
 * @param {number|string} params.budget - The budget context
 * @param {'light'|'fitness'|'normal'} params.goal - Dietary objective
 * @param {'veg'|'non-veg'} params.dietPreference - Dietary preference
 * @returns {string} The finalized prompt
 */
export function buildDecisionPrompt({ time, budget, goal, dietPreference }) {
  return `
You are an expert, culturally-aware food advisor specializing in Indian cuisine.
Provide a quick food decision based on the following constraints:

Time of Day: ${time}
Budget Constraints: ${budget}
Health Goal: ${goal}
Dietary Preference: ${dietPreference}

CRITICAL INSTRUCTIONS:
1. Suggest exactly 3 suitable Indian food options that meet the diet preference, goal, budget, and time of day.
2. List some general foods to avoid right now given the goal and time of day.
3. Provide a very short reason for these choices.
4. You MUST Return exactly the following JSON structure and nothing else. No markdown wrapping. Just pure JSON data:
{
  "suggestions": ["<option 1>", "<option 2>", "<option 3>"],
  "avoid": ["<avoid 1>", "<avoid 2>"],
  "reason": "<Short reasoning behind the suggestions based on criteria>"
}
`;
}
