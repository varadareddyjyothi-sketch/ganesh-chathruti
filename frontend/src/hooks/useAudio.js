import { useState, useEffect, useRef } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const isSetupRef = useRef(false);
  const intervalRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize Web Audio Synthesizer for Devotional Atmosphere
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
      masterGain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = masterGain;

      isSetupRef.current = true;
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  };

  // Play Temple Bell sound effect
  const playBellSound = () => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) initAudio();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // High bell harmonic frequencies
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6
      osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 1.5); // C5 decay

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    } catch (e) {
      console.log("Bell chime play error:", e);
    }
  };

  // Ambient Indian Sitar & Tanpura Drone Harmonics generator
  const startAmbientDrone = () => {
    if (!audioCtxRef.current) initAudio();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // Pentatonic scale frequencies in C (Sa Re Ga Pa Dha)
    const baseFreqs = [130.81, 146.83, 164.81, 196.00, 220.00, 261.63];

    const playHarmonicPulse = () => {
      if (isMuted || !isPlaying) return;
      try {
        const freq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        if (gainNodeRef.current) gain.connect(gainNodeRef.current);

        osc.start(now);
        osc.stop(now + 3.6);
      } catch (err) {
        // Safe catch
      }
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(playHarmonicPulse, 2200);
  };

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isMuted) {
      setIsMuted(false);
      if (gainNodeRef.current) gainNodeRef.current.gain.value = 0.15;
    } else {
      setIsMuted(true);
      if (gainNodeRef.current) gainNodeRef.current.gain.value = 0;
    }
  };

  const startMusic = () => {
    setIsPlaying(true);
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    startAmbientDrone();
  };

  useEffect(() => {
    if (isPlaying && !isMuted) {
      startAmbientDrone();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isMuted]);

  return {
    isPlaying,
    isMuted,
    startMusic,
    toggleAudio,
    playBellSound
  };
}
