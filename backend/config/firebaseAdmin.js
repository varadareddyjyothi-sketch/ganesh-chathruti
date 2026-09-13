const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

let db = null;
let isFirebaseInitialized = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('✅ Firebase Admin SDK initialized successfully.');
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const serviceAccountPath = path.resolve(
      path.dirname(process.env.FIREBASE_SERVICE_ACCOUNT_PATH),
      path.basename(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
    );
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('✅ Firebase Admin SDK initialized from service account file.');
  } else if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    });
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('✅ Firebase initialized with project ID.');
  } else {
    console.log('ℹ️ Firebase credentials not provided. Operating in safe memory/demo fallback mode.');
  }
} catch (error) {
  console.warn('⚠️ Firebase initialization warning:', error.message);
}

module.exports = {
  getDb: () => db,
  isFirebaseInitialized: () => isFirebaseInitialized,
  admin
};
