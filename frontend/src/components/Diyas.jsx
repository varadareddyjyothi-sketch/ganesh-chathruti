import React from 'react';
import { motion } from 'framer-motion';

export default function Diyas({ position = 'bottom-corners' }) {
  const diyaSvg = (
    <div className="relative flex flex-col items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]">
      {/* Flame */}
      <div className="relative w-6 h-10 mb-[-6px]">
        {/* Outer Flame Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full blur-[2px] diya-flame" />
        {/* Core Flame */}
        <div className="absolute inset-[3px] bg-gradient-to-t from-red-500 via-yellow-300 to-white rounded-full opacity-90 diya-flame" />
      </div>

      {/* Brass Diya Vessel */}
      <svg className="w-16 h-10 text-amber-500" viewBox="0 0 100 50" fill="currentColor">
        <path d="M 10 15 C 20 45, 80 45, 90 15 C 75 25, 25 25, 10 15 Z" fill="url(#goldGradient)" />
        <ellipse cx="50" cy="15" rx="40" ry="8" fill="#B45309" />
        <ellipse cx="50" cy="15" rx="35" ry="5" fill="#78350F" />
        <path d="M 45 12 L 55 12 L 50 5 Z" fill="#D97706" />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  if (position === 'bottom-row') {
    return (
      <div className="fixed bottom-4 left-0 right-0 z-30 flex justify-around items-center px-6 pointer-events-none">
        {[1, 2, 3, 4].map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: id * 0.2 }}
          >
            {diyaSvg}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Left Diya */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="fixed bottom-6 left-6 z-30 pointer-events-none md:bottom-8 md:left-12"
      >
        {diyaSvg}
      </motion.div>

      {/* Right Diya */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="fixed bottom-6 right-6 z-30 pointer-events-none md:bottom-8 md:right-12"
      >
        {diyaSvg}
      </motion.div>
    </>
  );
}
