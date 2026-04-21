/**
 * Firestore caching is disabled until GCP credentials are configured.
 * This module exports null placeholders so the rest of the app
 * can safely check `if (collections.guidanceCache)` without crashing.
 */

export const db = null;

export const collections = {
  guidanceCache: null,
};
