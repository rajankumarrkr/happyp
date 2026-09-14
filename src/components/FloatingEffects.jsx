import { useEffect, useState, useCallback } from 'react';

export default function FloatingEffects() {
  const [hearts, setHearts] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  // Spawn floating hearts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => {
        const newHearts = prev.filter((h) => Date.now() - h.created < 8000);
        if (newHearts.length < 8) {
          newHearts.push({
            id: Date.now() + Math.random(),
            created: Date.now(),
            x: Math.random() * 100,
            size: 10 + Math.random() * 14,
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 2,
            opacity: 0.15 + Math.random() * 0.2,
          });
        }
        return newHearts;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Cursor glow (desktop only)
  const handleMouseMove = useCallback((e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  // Click/Tap heart burst (works on mouse & mobile touch)
  useEffect(() => {
    const handlePointerDown = (e) => {
      // Don't burst on interactive buttons/inputs
      if (e.target.closest('button, a, input, [role="button"]')) return;

      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (!x && !y) return;

      const burst = document.createElement('div');
      burst.innerHTML = '❤️';
      burst.style.cssText = `
        position: fixed;
        left: ${x - 12}px;
        top: ${y - 12}px;
        font-size: 1.25rem;
        pointer-events: none;
        z-index: 9998;
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0.75;
      `;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 800);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <>
      {/* Cursor glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
      />

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              bottom: '-20px',
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
              animation: `petalFall ${heart.duration}s ease-in ${heart.delay}s forwards`,
              animationDirection: 'reverse',
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Rose petals */}
      <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute text-rose/10"
            style={{
              left: `${15 + i * 18}%`,
              top: '-20px',
              fontSize: '1.5rem',
              animation: `petalFall ${10 + i * 3}s linear ${i * 4}s infinite`,
            }}
          >
            🌸
          </div>
        ))}
      </div>
    </>
  );
}
