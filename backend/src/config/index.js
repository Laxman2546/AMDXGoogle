import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Validates that required environment variables are set.
 * Throws on missing critical vars in production; warns in development.
 */
function validateEnv() {
  const required = ['GEMINI_API_KEY'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const msg = `Missing required environment variables: ${missing.join(', ')}`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(msg);
    }
    // eslint-disable-next-line no-console
    console.warn(`⚠️  ${msg}`);
  }
}

validateEnv();

const config = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 8080,
  logLevel: process.env.LOG_LEVEL || 'info',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  gcp: {
    projectId: process.env.GCP_PROJECT_ID,
    location: process.env.GCP_LOCATION || 'asia-south1',
  },
  geminiApiKey: process.env.GEMINI_API_KEY,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
});

export default config;
