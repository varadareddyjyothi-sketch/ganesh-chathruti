import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import GaneshHero from '../components/GaneshHero';
import Diyas from '../components/Diyas';
import { RefreshCw, Share2, Home, Check } from 'lucide-react';

export default function Module6Final({ onMakeAnotherWish, onVisitAgain, playBellSound }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (playBellSound) playBellSound();

    // Trigger golden confetti burst
    const end = Date.now() + 3 * 1000;
    const colors = ['#FFD700', '#FFA500', '#FF7700', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [playBellSound]);

  const handleShare = () => {
    const shareData = {
      title: 'Ganesh Blessings – Ask a Wish',
      text: '🙏 I received Lord Ganesha\'s divine blessings! Ask your wish and celebrate Ganesh Chaturthi.',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden z-20 text-center bg-purple-950/40"
    >
      {/* Radiant Bright Gold Glow Background */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,_rgba(255,215,0,0.45)_0%,_rgba(255,140,0,0.25)_50%,_transparent_80%)] pointer-events-none" />

      {/* Ganesh Illustration */}
      <div className="z-20 my-2">
        <GaneshHero isInteractive={false} size="medium" />
      </div>

      {/* Main Celebration Headers */}
      <div className="z-30 max-w-2xl mx-auto px-4 my-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black text-divine-heading mb-3 tracking-wide"
        >
          🎉 GANPATI BAPPA MORYA! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-amber-100 font-serif italic leading-relaxed"
        >
          "May happiness, success and prosperity always stay with you."
        </motion.p>
      </div>

      {/* Action Buttons Row */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="z-30 flex flex-wrap items-center justify-center gap-4 mt-6 max-w-xl mx-auto"
      >
        {/* Make Another Wish */}
        <button
          onClick={onMakeAnotherWish}
          className="px-6 py-3.5 rounded-full btn-gold-gradient text-purple-950 font-bold text-base md:text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.5)] cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
          <span>🙏 Make Another Wish</span>
        </button>

        {/* Share the Blessing */}
        <button
          onClick={handleShare}
          className="px-6 py-3.5 rounded-full glass-panel border-2 border-amber-300 text-amber-200 font-bold text-base md:text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:bg-amber-400/20 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5 text-amber-300" />}
          <span>{copied ? "Link Copied! ✨" : "Share the Blessing ✨"}</span>
        </button>

        {/* Visit Again */}
        <button
          onClick={onVisitAgain}
          className="px-6 py-3.5 rounded-full glass-panel border border-amber-400/40 text-amber-300 font-semibold text-base flex items-center gap-2 hover:border-amber-300 cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span>Visit Again 🐘</span>
        </button>
      </motion.div>

      <Diyas position="bottom-corners" />
    </motion.div>
  );
}
