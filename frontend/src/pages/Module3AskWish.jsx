import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendWishToBackend } from '../services/api';
import { Sparkles, Send, AlertCircle } from 'lucide-react';
import Diyas from '../components/Diyas';

export default function Module3AskWish({ onSubmitSuccess }) {
  const [wishText, setWishText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const maxChars = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wishText.trim()) {
      setErrorMessage("Please write your wish from your heart before submitting 🙏");
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await sendWishToBackend(wishText.trim());
      setIsLoading(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(wishText.trim(), response?.wishData || response);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Failed to submit wish. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden z-20"
    >
      {/* Glassmorphism Chat Card Container */}
      <div className="max-w-xl w-full glass-panel-glow p-6 md:p-8 rounded-3xl border-2 border-amber-400/50 shadow-[0_0_50px_rgba(255,215,0,0.3)] relative">
        {/* Header Avatar & Status */}
        <div className="flex items-center gap-4 pb-4 border-b border-amber-400/20">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-[0_0_15px_#f59e0b]">
            <div className="w-full h-full rounded-full bg-purple-950 flex items-center justify-center text-2xl">
              🐘
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-amber-200">Lord Ganesha</h3>
            <div className="flex items-center gap-2 text-xs text-amber-300/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Listening to your wish ✨</span>
            </div>
          </div>
        </div>

        {/* Ganesha Speech Prompt */}
        <div className="my-5 p-4 rounded-xl bg-purple-900/60 border border-amber-400/30 flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
          <p className="text-base md:text-lg text-amber-100 font-serif italic">
            "Ask a wish, my child 🤗💖, I am listening💖."
          </p>
        </div>

        {/* Wish Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value.slice(0, maxChars))}
              rows={4}
              placeholder="Write your wish from your heart... ✨ (e.g. I wish for happiness, success and good health for my family)"
              disabled={isLoading}
              className="w-full p-4 rounded-xl bg-purple-950/80 border-2 border-amber-400/40 text-amber-100 placeholder-amber-300/40 focus:outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-400/20 transition-all resize-none font-sans text-base md:text-lg"
            />
            <div className="text-right text-xs text-amber-300/60 mt-1">
              {maxChars - wishText.length} characters remaining
            </div>
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-sm"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl btn-gold-gradient font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,215,0,0.5)] cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-purple-950 border-t-transparent rounded-full animate-spin" />
                <span>Conveying Wish to Ganesha...</span>
              </div>
            ) : (
              <>
                <span>🙏 Submit My Wish</span>
                <Send className="w-5 h-5 text-purple-950" />
              </>
            )}
          </motion.button>
        </form>
      </div>

      <Diyas position="bottom-corners" />
    </motion.div>
  );
}
