import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

export default function TempleBells({ onRing }) {
  const handleBellClick = (e) => {
    e.stopPropagation();
    if (onRing) onRing();
  };

  return (
    <div className="fixed top-12 left-0 right-0 z-30 pointer-events-none flex justify-between px-8 md:px-24">
      {/* Left Hanging Bell */}
      <motion.div
        onClick={handleBellClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ rotate: [-15, 15, -10, 10, 0], scale: 1.1 }}
        className="pointer-events-auto cursor-pointer flex flex-col items-center group"
      >
        <div className="w-0.5 h-16 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_8px_#f59e0b]" />
        <div className="relative p-2 rounded-full bg-amber-500/20 group-hover:bg-amber-400/30 transition-all filter drop-shadow-[0_0_12px_#f59e0b]">
          <Bell className="w-8 h-8 text-amber-300 fill-amber-400/50 group-hover:rotate-12 transition-transform" />
        </div>
      </motion.div>

      {/* Right Hanging Bell */}
      <motion.div
        onClick={handleBellClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ rotate: [15, -15, 10, -10, 0], scale: 1.1 }}
        className="pointer-events-auto cursor-pointer flex flex-col items-center group"
      >
        <div className="w-0.5 h-16 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_8px_#f59e0b]" />
        <div className="relative p-2 rounded-full bg-amber-500/20 group-hover:bg-amber-400/30 transition-all filter drop-shadow-[0_0_12px_#f59e0b]">
          <Bell className="w-8 h-8 text-amber-300 fill-amber-400/50 group-hover:-rotate-12 transition-transform" />
        </div>
      </motion.div>
    </div>
  );
}
