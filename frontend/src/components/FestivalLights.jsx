import React from 'react';
import { motion } from 'framer-motion';

export default function FestivalLights() {
  const bulbsCount = 16;
  const bulbs = Array.from({ length: bulbsCount });

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none flex flex-col items-center">
      {/* Hanging Wire & Bulbs */}
      <div className="w-full flex justify-between items-start px-2 relative h-12">
        <svg className="absolute top-0 left-0 w-full h-8 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
          <path d="M 0,0 Q 25,18 50,2 Q 75,18 100,0" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.8" />
        </svg>

        {bulbs.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.7 }}
            animate={{
              opacity: [0.6, 1, 0.7],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15
            }}
            className="flex flex-col items-center z-10 pt-1"
          >
            {/* Bulb Base */}
            <div className="w-1.5 h-2 bg-yellow-800 rounded-t-sm" />
            {/* Glowing Bulb */}
            <div
              className={`w-3.5 h-5 rounded-full ${
                i % 3 === 0
                  ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24]'
                  : i % 3 === 1
                  ? 'bg-orange-500 shadow-[0_0_12px_#f97316]'
                  : 'bg-yellow-300 shadow-[0_0_12px_#fde047]'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Marigold Garland Strand */}
      <div className="w-full flex justify-around items-center px-4 mt-[-4px]">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
          />
        ))}
      </div>
    </div>
  );
}
