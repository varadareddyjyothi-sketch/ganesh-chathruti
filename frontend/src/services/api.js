/**
 * API Service for Ganesh Blessings Frontend
 */

import { saveWishToFirebase } from './firebase';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

/**
 * Generate anonymous session ID for tracking local session wishes
 */
export function getSessionId() {
  let sessionId = localStorage.getItem('ganesh_session_id');
  if (!sessionId) {
    sessionId = `bappa_guest_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    localStorage.setItem('ganesh_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Submit the user's name and wish to the backend, with direct Firestore fallback.
 */
export async function sendWishToBackend(wishText, userName) {
  const sessionId = getSessionId();

  try {
    const response = await fetch(`${BACKEND_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        wish: wishText,
        sessionId: sessionId
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    console.warn(`Backend rejected wish submission with status ${response.status}.`);
  } catch (error) {
    console.warn('Backend API unavailable. Trying Firebase Firestore directly.', error);
  }

  // Graceful Local Fallback Sentiment Generator
  const wishLower = wishText.toLowerCase();
  let positiveMsg = "May Lord Ganesha remove all obstacles from your life and shower you with wisdom, happiness, and peace.";

  if (wishLower.includes('health') || wishLower.includes('heal') || wishLower.includes('family')) {
    positiveMsg = "May Lord Ganesha shield your family with divine health, happiness, and long life.";
  } else if (wishLower.includes('success') || wishLower.includes('job') || wishLower.includes('exam') || wishLower.includes('career')) {
    positiveMsg = "May Ganesha, the remover of obstacles, grant you boundless success in all your endeavors.";
  } else if (wishLower.includes('peace') || wishLower.includes('happy') || wishLower.includes('joy')) {
    positiveMsg = "May divine tranquility and endless joy overflow in your life and home.";
  }

  try {
    const firebaseId = await saveWishToFirebase({
      name: userName,
      wish: wishText,
      sessionId,
      sentiment: 'hopeful',
      positiveMessage: positiveMsg
    });

    return {
      success: true,
      id: firebaseId,
      message: "Your wish has reached Lord Ganesha 🙏✨",
      wishData: {
        name: userName,
        wish: wishText,
        sentiment: "hopeful",
        positiveMessage: positiveMsg,
        createdAt: new Date().toISOString()
      }
    };
  } catch (firebaseError) {
    console.warn('Firebase Firestore save failed. Falling back to local storage.', firebaseError);
  }

  // Save locally only when both backend and direct Firestore are unavailable.
  const savedWishes = JSON.parse(localStorage.getItem('ganesh_user_wishes') || '[]');
  const newWish = {
    id: `wish_local_${Date.now()}`,
    name: userName,
    wish: wishText,
    sessionId: sessionId,
    sentiment: 'hopeful',
    positiveMessage: positiveMsg,
    createdAt: new Date().toISOString()
  };
  savedWishes.unshift(newWish);
  localStorage.setItem('ganesh_user_wishes', JSON.stringify(savedWishes));

  return {
    success: true,
    id: newWish.id,
    message: "Your wish has reached Lord Ganesha 🙏✨",
    wishData: {
      name: userName,
      wish: wishText,
      sentiment: "hopeful",
      positiveMessage: positiveMsg,
      createdAt: newWish.createdAt
    }
  };
}
