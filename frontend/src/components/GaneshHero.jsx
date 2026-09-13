import React from 'react';
import { motion } from 'framer-motion';
import ganeshaImg from '../assets/ganesha.jpg';

export default function GaneshHero({ onClick, isInteractive = true, size = 'large', blessingHand = false }) {
  const containerSizes = {
    small: 'w-48 h-48 md:w-64 md:h-64',
    medium: 'w-64 h-64 md:w-80 md:h-80',
    large: 'w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]'
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4 group">
      {/* Divine Light Rays Background */}
      <div className="absolute inset-[-40px] pointer-events-none flex items-center justify-center opacity-60">
        <div className="w-[140%] h-[140%] bg-[radial-gradient(circle,_rgba(255,215,0,0.35)_0%,_rgba(255,140,0,0.15)_40%,_transparent_70%)] animate-pulse" />
      </div>

      {/* Pulsing Aura Circle */}
      <div className="absolute inset-[-15px] rounded-full divine-aura pointer-events-none bg-gradient-to-r from-amber-400/40 via-yellow-300/50 to-orange-500/40" />

      {/* Main Image Frame Container */}
      <motion.div
        onClick={isInteractive ? onClick : undefined}
        whileHover={isInteractive ? { scale: 1.05 } : {}}
        whileTap={isInteractive ? { scale: 0.96 } : {}}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.3 }
        }}
        className={`relative ${containerSizes[size]} rounded-full p-2.5 bg-gradient-to-tr from-amber-500 via-yellow-300 to-orange-500 shadow-[0_0_50px_rgba(255,215,0,0.6)] ${
          isInteractive ? 'cursor-pointer' : ''
        }`}
      >
        {/* Inner Golden Ring */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-yellow-200/80 relative shadow-inner">
          <img
            src={ganeshaImg}
            alt="Divine Lord Ganesha"
            className="w-full h-full object-cover rounded-full transform transition-transform duration-700 group-hover:scale-110"
          />

          {/* Golden Divine Ray Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-amber-300/10 pointer-events-none" />

          {/* Optional Blessing Ray Animation */}
          {blessingHand && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-amber-400/40 to-transparent rounded-full pointer-events-none"
            />
          )}
        </div>

        {/* Decorative Marigold Garlands on Frame */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          <span className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
          <span className="w-5 h-5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
          <span className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
        </div>
      </motion.div>

      {/* Decorative Interactive Hint */}
      {isInteractive && (
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7], y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-3 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-medium tracking-wide shadow-[0_0_10px_rgba(255,215,0,0.2)]"
        >
          ✨ Tap Ganesha for Divine Blessing ✨
        </motion.div>
      )}
    </div>
  );
}
