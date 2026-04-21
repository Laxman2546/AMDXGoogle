import admin from 'firebase-admin';

// Initialize Firebase Admin App
// Cloud Run automatically provides default credentials,
// so initializing without args uses the attached service account.
// Locally, it uses GOOGLE_APPLICATION_CREDENTIALS if set.
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Access to Firestore instance.
 * @type {FirebaseFirestore.Firestore}
 */
export const db = admin.firestore();

// Set up specific collections for cleaner usage
export const collections = {
  guidanceCache: db.collection('guidanceCache'),
};
