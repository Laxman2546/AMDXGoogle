import { GoogleGenAI } from '@google/genai';
import config from '../../config/index.js';

// Setup new Google Gen AI client evaluating the local credentials mapping
const clientConfig = {};

if (process.env.GEMINI_API_KEY) {
  clientConfig.apiKey = process.env.GEMINI_API_KEY;
} else {
  clientConfig.project = config.gcp.projectId || process.env.GOOGLE_CLOUD_PROJECT || 'local-dev-sandbox';
  clientConfig.location = config.gcp.location || 'us-central1';
}

const ai = new GoogleGenAI(clientConfig);

/**
 * Polyfill bridging the new Gen AI SDK to the expected shape of the older SDK.
 */
const textModel = {
  async generateContent(request) {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: request.contents,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      }
    });

    return {
      response: {
        candidates: [
          {
            content: {
              parts: [{ text: response.text }]
            }
          }
        ]
      }
    };
  }
};

export default textModel;
