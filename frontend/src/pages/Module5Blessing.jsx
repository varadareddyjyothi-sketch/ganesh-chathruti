import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GaneshHero from '../components/GaneshHero';
import Diyas from '../components/Diyas';

export default function Module5Blessing({ wishData, onNext, playBellSound }) {
  const [stepIndex, setStepIndex] = useState(0);

  const defaultMsg = "Believe in yourself. Keep moving forward. Your journey is blessed. ✨";
  const positiveMessage = wishData?.positiveMessage || defaultMsg;

  const blessingSteps = [
    "🙏 Ganesha has heard your wish 🙏",
    "May your wish come true.",
    "May Lord Ganesha remove every obstacle from your path.",
    positiveMessage
  ];

  useEffect(() => {
    if (playBellSound) playBellSound();

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < blessingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [playBellSound, blessingSteps.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden z-20 text-center"
    >
      {/* Divine Golden Blessing Rays Beam towards Screen */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle,_rgba(255,215,0,0.6)_0%,_rgba(255,165,0,0.3)_45%,_transparent_75%)] pointer-events-none"
      />

      {/* Ganesh Raising Blessing Hand */}
      <div className="z-20 my-2">
        <GaneshHero isInteractive={false} size="medium" blessingHand={true} />
      </div>

      {/* Sequential Cinematic Text Blessing Box */}
      <div className="z-30 max-w-xl w-full min-h-[160px] flex items-center justify-center px-4 my-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="glass-panel-glow p-6 md:p-8 rounded-3xl border-2 border-amber-300 shadow-[0_0_50px_rgba(255,215,0,0.5)] w-full"
          >
            <p className="text-2xl md:text-4xl font-extrabold text-divine-heading leading-relaxed font-serif">
              "{blessingSteps[stepIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue to Final Celebration Button */}
      {stepIndex >= blessingSteps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-30 mt-4"
        >
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full btn-gold-gradient text-purple-950 font-bold text-lg md:text-xl shadow-[0_0_30px_rgba(255,215,0,0.6)] cursor-pointer"
          >
            Receive Final Celebration 🎉
          </button>
        </motion.div>
      )}

      <Diyas position="bottom-corners" />
    </motion.div>
  );
}
