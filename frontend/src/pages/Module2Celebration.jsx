import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GaneshHero from '../components/GaneshHero';
import Diyas from '../components/Diyas';

export default function Module2Celebration({ onNext, playBellSound }) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [displayedSpeech, setDisplayedSpeech] = useState("");
  const fullSpeech = "Ask a wish, my child 🤗💖 Tell me what is in your heart 💖.";

  useEffect(() => {
    // 10-second timer to initiate Ganesha speech bubble
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
      if (playBellSound) playBellSound();
    }, 10000);

    return () => clearTimeout(timer);
  }, [playBellSound]);

  useEffect(() => {
    if (!showSpeechBubble) return;

    let index = 0;
    const wordTimer = setInterval(() => {
      if (index <= fullSpeech.length) {
        setDisplayedSpeech(fullSpeech.slice(0, index));
        index++;
      } else {
        clearInterval(wordTimer);
      }
    }, 40);

    return () => clearInterval(wordTimer);
  }, [showSpeechBubble]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden transition-all duration-1000 ${showSpeechBubble ? 'bg-purple-950/80' : ''
        }`}
    >
      {/* Golden Light Burst from center when speech appears */}
      {showSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.7, scale: 1.5 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-10 bg-[radial-gradient(circle,_rgba(255,215,0,0.4)_0%,_transparent_70%)] pointer-events-none"
        />
      )}

      {/* Ganesh Illustration */}
      <div className="z-20 my-2">
        <GaneshHero isInteractive={false} size="medium" />
      </div>

      {/* Festival Greeting Text */}
      <div className="z-20 text-center max-w-xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-divine-heading mb-3 tracking-wide"
        >
          Ganapati Bappa Morya! 🙏
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-amber-100/90 font-medium leading-relaxed font-serif italic"
        >
          May this Ganesh Chaturthi bring joy, wisdom and prosperity into your life.
        </motion.p>
      </div>

      {/* Ganesha Divine Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="z-30 mt-6 max-w-md w-full px-4"
          >
            <div className="glass-panel-glow p-6 rounded-2xl relative border-2 border-amber-400/60 shadow-[0_0_40px_rgba(255,215,0,0.4)] text-center">
              {/* Top Pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-purple-900 border-t-2 border-l-2 border-amber-400/60" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🐘</span>
                <span className="text-sm font-bold text-amber-300 tracking-wider uppercase">Lord Ganesha Speaks</span>
              </div>

              <p className="text-xl md:text-2xl font-semibold text-amber-100 min-h-[3rem] font-serif leading-relaxed">
                "{displayedSpeech}"
                <span className="animate-pulse text-amber-400">|</span>
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                onClick={onNext}
                className="mt-5 px-6 py-2.5 rounded-full btn-gold-gradient text-purple-950 font-bold text-base shadow-[0_0_20px_rgba(255,215,0,0.5)] cursor-pointer"
              >
                Convey My Wish 🙏
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Diyas position="bottom-corners" />
    </motion.div>
  );
}
