import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GaneshHero from '../components/GaneshHero';
import Diyas from '../components/Diyas';

export default function Module1Welcome({ onNext, playBellSound }) {
  const [isBursting, setIsBursting] = useState(false);

  const handleGaneshClick = () => {
    setIsBursting(true);
    if (playBellSound) playBellSound();

    setTimeout(() => {
      onNext();
    }, 1200);
  };

  const titleText = " Welcome to Ganesh Chaturthi ";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden transition-all duration-1000 ${isBursting ? 'brightness-150 scale-105' : 'brightness-100'
        }`}
    >
      {/* Light Burst Transition Overlay */}
      {isBursting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 3 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-50 bg-[radial-gradient(circle,_rgba(255,215,0,0.9)_0%,_rgba(255,140,0,0.6)_40%,_transparent_80%)] pointer-events-none"
        />
      )}

      {/* Hero Ganesha Illustration */}
      <div className="z-20 my-4">
        <GaneshHero onClick={handleGaneshClick} size="large" isInteractive={true} />
      </div>

      {/* Animated Main Title */}
      <div className="z-20 text-center max-w-2xl mx-auto mt-2">
        <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-divine-heading mb-4 leading-tight">
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.03,
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-lg md:text-2xl text-amber-200/90 font-medium px-4 leading-relaxed font-serif italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          "May Lord Ganesha remove all obstacles and fill your life with happiness."
        </motion.p>

        {/* Touch to Begin CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-8"
        >
          <button
            onClick={handleGaneshClick}
            className="px-8 py-3.5 rounded-full btn-gold-gradient text-purple-950 font-bold text-lg md:text-xl shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.8)] transition-all transform hover:scale-105 cursor-pointer border border-amber-200"
          >
            Touch Ganesha to Begin Your Celebration ✨
          </button>
        </motion.div>
      </div>

      <Diyas position="bottom-corners" />
    </motion.div>
  );
}
