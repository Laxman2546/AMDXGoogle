/**
 * Constructs the contextual prompt for Vertex AI.
 * 
 * @param {object} params
 * @param {string} params.condition
 * @param {string} params.dietPreference - "veg" | "non-veg"
 * @param {string} params.language - "en" | "te" | "hi"
 * @returns {string} The final compiled prompt
 */
export function buildGuidancePrompt({ condition, dietPreference, language }) {
  return `
You are an expert, culturally-aware nutritional advisor specializing in Indian cuisine.
Your task is to provide dietary guidance for someone experiencing the following condition.

Condition: "${condition}"
Diet Preference: ${dietPreference}
Target Language Code: "${language}"

CRITICAL INSTRUCTIONS:
1. Suggest common foods, including specifically Indian household remedies/meals.
2. Must strictly align with the requested diet preference (No meat if veg).
3. Do NOT make medical or diagnostic claims.
4. TRANSLATION: You MUST write the actual array contents and string values (title, foods, tips, reason) in the requested Target Language Code (Translate to Hindi script for "hi", Telugu script for "te", English for "en").
5. Only the JSON structural keys (title, eat, avoid, tips, reason, regional, te, hi) must remain in English.
6. You MUST Return exactly the following JSON structure and nothing else. No markdown wrapping. Just pure JSON data:
{
  "title": "<A sympathetic title>",
  "eat": ["<food 1>", "<food 2>"],
  "avoid": ["<food to avoid>"],
  "tips": ["<hydration/lifestyle tip>"],
  "reason": "<Short reasoning avoiding medical diagnosis>",
  "regional": {
    "te": "<A short summary/title in Telugu>",
    "hi": "<A short summary/title in Hindi>"
  }
}
`;
}
