const axios = require('axios');
const { getDb, isFirebaseInitialized } = require('../config/firebaseAdmin');

// In-memory fallback store when Firebase is not configured locally
const inMemoryWishes = [];

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001/analyze-wish';

// Helper to sanitize HTML tags
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

/**
 * POST /api/wishes
 * Submit user wish
 */
exports.submitWish = async (req, res) => {
  try {
    const { name, wish, sessionId } = req.body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name cannot be empty.'
      });
    }

    if (!wish || typeof wish !== 'string' || !wish.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Wish content cannot be empty.'
      });
    }

    const cleanName = sanitizeInput(name);
    const cleanWish = sanitizeInput(wish);
    if (cleanName.length > 60) {
      return res.status(400).json({
        success: false,
        error: 'Name cannot exceed 60 characters.'
      });
    }
    if (cleanWish.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Wish cannot exceed 500 characters.'
      });
    }

    const finalSessionId = sessionId || `anon_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

    // 2. Call Python Sentiment Microservice (with graceful fallback)
    let sentiment = 'hopeful';
    let positiveMessage = 'May Lord Ganesha remove every obstacle and bless your journey with peace and fulfillment.';

    try {
      const pythonRes = await axios.post(PYTHON_SERVICE_URL, { wish: cleanWish }, { timeout: 3000 });
      if (pythonRes.data) {
        sentiment = pythonRes.data.sentiment || sentiment;
        positiveMessage = pythonRes.data.positiveMessage || positiveMessage;
      }
    } catch (pythonError) {
      console.log('ℹ️ Python microservice unavailable or timed out. Using default divine blessing generator.');
    }

    // 3. Save to Firebase Firestore / Fallback Storage
    const wishData = {
      name: cleanName,
      wish: cleanWish,
      sessionId: finalSessionId,
      sentiment: sentiment,
      positiveMessage: positiveMessage,
      createdAt: new Date().toISOString()
    };

    let docId = `wish_${Date.now()}`;

    if (isFirebaseInitialized()) {
      const db = getDb();
      const docRef = await db.collection('wishes').add({
        ...wishData,
        createdAt: new Date()
      });
      docId = docRef.id;
    } else {
      inMemoryWishes.unshift({ id: docId, ...wishData });
      if (inMemoryWishes.length > 100) inMemoryWishes.pop();
    }

    return res.status(201).json({
      success: true,
      id: docId,
      message: 'Your wish has reached Lord Ganesha 🙏✨',
      wishData: {
        name: cleanName,
        wish: cleanWish,
        sentiment: sentiment,
        positiveMessage: positiveMessage,
        createdAt: wishData.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Error submitting wish:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while conveying your wish. Please try again.'
    });
  }
};

/**
 * GET /api/wishes
 * Get recent public blessings count / sample wishes
 */
exports.getWishes = async (req, res) => {
  try {
    if (isFirebaseInitialized()) {
      const db = getDb();
      const snapshot = await db.collection('wishes')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();

      const wishes = [];
      snapshot.forEach(doc => {
        wishes.push({ id: doc.id, ...doc.data() });
      });

      return res.status(200).json({
        success: true,
        count: wishes.length,
        wishes: wishes
      });
    } else {
      return res.status(200).json({
        success: true,
        count: inMemoryWishes.length,
        wishes: inMemoryWishes.slice(0, 20)
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
