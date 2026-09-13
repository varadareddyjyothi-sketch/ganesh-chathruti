import React from 'react';

export default function RangoliPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-20">
      {/* Outer Rotating Mandala */}
      <svg
        className="w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] text-amber-400 rotate-slow"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="100" cy="100" r="90" strokeDasharray="3,3" />
        <circle cx="100" cy="100" r="80" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="70" strokeDasharray="1,2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 100 + 80 * Math.cos(angle);
          const y2 = 100 + 80 * Math.sin(angle);
          return <line key={i} x1="100" y1="100" x2={x2} y2={y2} strokeOpacity="0.4" />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 100 + 55 * Math.cos(angle);
          const cy = 100 + 55 * Math.sin(angle);
          return <circle key={`c-${i}`} cx={cx} cy={cy} r="12" strokeWidth="0.5" strokeOpacity="0.6" />;
        })}
      </svg>

      {/* Inner Reverse Rotating Ring */}
      <svg
        className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] text-yellow-300 rotate-slow-reverse"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <circle cx="100" cy="100" r="50" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 100 + 35 * Math.cos(angle);
          const cy = 100 + 35 * Math.sin(angle);
          return <circle key={`inner-${i}`} cx={cx} cy={cy} r="8" strokeOpacity="0.8" />;
        })}
      </svg>
    </div>
  );
}
