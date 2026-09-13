import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GaneshHero from '../components/GaneshHero';
import Diyas from '../components/Diyas';

export default function Module4WishAccepted({ wishText, onNext, playBellSound }) {
  useEffect(() => {
    if (playBellSound) playBellSound();

    const timer = setTimeout(() => {
      onNext();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onNext, playBellSound]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden z-20 text-center"
    >
      {/* Expanding Divine Light Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 2 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle,_rgba(255,215,0,0.5)_0%,_rgba(255,140,0,0.3)_40%,_transparent_75%)] pointer-events-none"
      />

      {/* Ganesh Illustration Glowing Brighter */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0, scale: 1.08 }}
        transition={{ duration: 2 }}
        className="z-20 my-2"
      >
        <GaneshHero isInteractive={false} size="medium" blessingHand={true} />
      </motion.div>

      {/* User Wish Floating & Transforming into Golden Rays */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: [0, 1, 1, 0], y: [30, 0, -40, -100] }}
        transition={{ duration: 5, times: [0, 0.2, 0.7, 1] }}
        className="z-30 max-w-lg mx-auto glass-panel p-6 rounded-2xl border-2 border-amber-300 shadow-[0_0_50px_rgba(255,215,0,0.6)] my-4"
      >
        <p className="text-amber-200/70 text-xs font-semibold uppercase tracking-widest mb-1">
          Your Sacred Request
        </p>
        <p className="text-xl md:text-2xl font-serif font-medium text-amber-100 italic leading-relaxed">
          "{wishText}"
        </p>
      </motion.div>

      {/* Main Status Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-30 mt-4"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-divine-heading mb-2">
          Your wish has reached Ganesha 🙏✨
        </h2>
        <p className="text-lg md:text-xl text-amber-200/90 font-serif italic">
          Transforming into divine golden blessings...
        </p>
      </motion.div>

      <Diyas position="bottom-row" />
    </motion.div>
  );
}
