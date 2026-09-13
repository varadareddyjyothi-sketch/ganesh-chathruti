import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAudio } from './hooks/useAudio';

// Background & Overlay Components
import FloatingParticles from './components/FloatingParticles';
import FallingFlowers from './components/FallingFlowers';
import FestivalLights from './components/FestivalLights';
import RangoliPattern from './components/RangoliPattern';
import TempleBells from './components/TempleBells';
import SoundToggle from './components/SoundToggle';

// Page Screen Modules
import Module1Welcome from './pages/Module1Welcome';
import Module2Celebration from './pages/Module2Celebration';
import Module3AskWish from './pages/Module3AskWish';
import Module4WishAccepted from './pages/Module4WishAccepted';
import Module5Blessing from './pages/Module5Blessing';
import Module6Final from './pages/Module6Final';

export default function App() {
  const [currentModule, setCurrentModule] = useState(1);
  const [userName, setUserName] = useState('');
  const [userWishText, setUserWishText] = useState('');
  const [wishResult, setWishResult] = useState(null);

  const { isMuted, startMusic, toggleAudio, playBellSound } = useAudio();

  const handleStartCelebration = () => {
    startMusic();
    playBellSound();
    setCurrentModule(2);
  };

  const handleWishSubmitted = (text, result) => {
    setUserWishText(text);
    setWishResult(result);
    setCurrentModule(4);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#100720] via-[#1a0933] to-[#0a0e29] text-slate-100 overflow-x-hidden font-sans select-none">
      {/* Background Decor */}
      <RangoliPattern />
      <FloatingParticles count={currentModule === 6 ? 60 : 40} />
      <FallingFlowers count={currentModule >= 4 ? 35 : 20} active={true} />
      <FestivalLights />
      <TempleBells onRing={playBellSound} />
      <SoundToggle isMuted={isMuted} onToggle={toggleAudio} />

      {/* Screen Router */}
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentModule === 1 && (
            <Module1Welcome
              key="module1"
              onNext={handleStartCelebration}
              playBellSound={playBellSound}
            />
          )}

          {currentModule === 2 && (
            <Module2Celebration
              key="module2"
              onNext={() => setCurrentModule(3)}
              onNameConfirmed={setUserName}
              playBellSound={playBellSound}
            />
          )}

          {currentModule === 3 && (
            <Module3AskWish
              key="module3"
              userName={userName}
              onSubmitSuccess={handleWishSubmitted}
            />
          )}

          {currentModule === 4 && (
            <Module4WishAccepted
              key="module4"
              wishText={userWishText}
              onNext={() => setCurrentModule(5)}
              playBellSound={playBellSound}
            />
          )}

          {currentModule === 5 && (
            <Module5Blessing
              key="module5"
              wishData={wishResult}
              onNext={() => setCurrentModule(6)}
              playBellSound={playBellSound}
            />
          )}

          {currentModule === 6 && (
            <Module6Final
              key="module6"
              onMakeAnotherWish={() => setCurrentModule(3)}
              onVisitAgain={() => setCurrentModule(1)}
              playBellSound={playBellSound}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
