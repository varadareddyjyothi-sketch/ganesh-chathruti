import React, { useEffect, useRef } from 'react';

export default function FallingFlowers({ count = 25, active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Marigold Petal Setup
    const petalCount = Math.floor(count * (window.innerWidth < 768 ? 0.5 : 1));
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 6,
      color: Math.random() > 0.4 ? '#FF8C00' : (Math.random() > 0.5 ? '#FFD700' : '#E63946'),
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1.2 - 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      oscillationSpeed: Math.random() * 0.03 + 0.01,
      oscillationAmp: Math.random() * 1.5 + 0.5
    }));

    let step = 0;

    const drawPetal = (x, y, size, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      // Draw organic petal teardrop shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size / 2, -size, 0, -size * 1.2);
      ctx.bezierCurveTo(size / 2, -size, size / 2, -size / 2, 0, 0);
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step += 0.02;

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(step * p.oscillationSpeed) * p.oscillationAmp;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        drawPetal(p.x, p.y, p.size, p.rotation, p.color);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity: 0.9 }}
    />
  );
}
