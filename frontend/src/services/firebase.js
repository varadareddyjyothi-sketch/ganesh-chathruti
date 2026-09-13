import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Client Firebase config reading environment variables or using fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForGaneshBlessingsApp",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ganesh-blessings.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ganesh-blessings-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ganesh-blessings.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

let app;
let db = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  // Initialize Firestore
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase client init notice: running in local mock fallback mode.", e);
}

export { db, collection, addDoc, serverTimestamp };
