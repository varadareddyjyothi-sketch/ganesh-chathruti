/**
 * API Service for Ganesh Blessings Frontend
 */

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
 * Submit user's wish to Express backend API, with graceful offline fallback
 */
export async function sendWishToBackend(wishText) {
  const sessionId = getSessionId();

  try {
    const response = await fetch(`${BACKEND_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wish: wishText,
        sessionId: sessionId
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log('ℹ️ Backend API unavailable. Processing wish locally with divine sentiment generator.');
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

  // Save to local storage
  const savedWishes = JSON.parse(localStorage.getItem('ganesh_user_wishes') || '[]');
  const newWish = {
    id: `wish_local_${Date.now()}`,
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
      wish: wishText,
      sentiment: "hopeful",
      positiveMessage: positiveMsg,
      createdAt: newWish.createdAt
    }
  };
}
