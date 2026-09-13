import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Client Firebase config reading environment variables or using fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAlWW6iSXtP_xyGCbTxTgkZy2ACM5YaF4g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ganesh-chathruti.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ganesh-chathruti",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ganesh-chathruti.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "444249288813",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:444249288813:web:6e2b78b54c1dea11118f64"
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

export async function saveWishToFirebase({ name, wish, sessionId, sentiment, positiveMessage }) {
  if (!db) {
    throw new Error('Firebase Firestore is not initialized.');
  }

  const wishRef = await addDoc(collection(db, 'wishes'), {
    name,
    wish,
    sessionId,
    sentiment,
    positiveMessage,
    createdAt: serverTimestamp()
  });

  return wishRef.id;
}

export { db, collection, addDoc, serverTimestamp };
