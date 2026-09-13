import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SoundToggle({ isMuted, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:border-amber-300 transition-all cursor-pointer"
      title={isMuted ? "Unmute Devotional Music" : "Mute Music"}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-5 h-5 text-red-400" />
          <span className="text-xs font-semibold tracking-wide text-red-300">Muted</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-amber-200">Devotional Sound</span>
          <span className="flex gap-1 items-end h-3">
            <span className="w-1 bg-amber-400 h-2 animate-bounce" />
            <span className="w-1 bg-amber-400 h-3 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1 bg-amber-400 h-1 animate-bounce [animation-delay:0.4s]" />
          </span>
        </>
      )}
    </motion.button>
  );
}
