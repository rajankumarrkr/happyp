import { useEffect, useState, useCallback, useRef } from 'react';
import { sounds } from '../utils/soundEffects';

export default function FloatingEffects() {
  const [hearts, setHearts] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [trail, setTrail] = useState([]);
  const lastTrailTime = useRef(0);

  // Periodic spawn of floating rose petals and ambient hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => {
        const active = prev.filter((h) => Date.now() - h.created < 10000);
        if (active.length < 12) {
          active.push({
            id: Date.now() + Math.random(),
            created: Date.now(),
            x: Math.random() * 100,
            size: 14 + Math.random() * 16,
            duration: 8 + Math.random() * 5,
            delay: Math.random() * 2,
            opacity: 0.2 + Math.random() * 0.25,
            type: Math.random() > 0.4 ? 'petal' : 'heart',
          });
        }
        return active;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Mouse move and touch drag particle trail generator
  const spawnTrailParticle = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastTrailTime.current < 45) return; // Throttle particle count
    lastTrailTime.current = now;

    const symbols = ['✨', '💖', '🌸', '⭐', '✦'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    setTrail((prev) => {
      const active = prev.filter((p) => now - p.created < 800);
      return [
        ...active,
        {
          id: now + Math.random(),
          created: now,
          x,
          y,
          symbol,
          size: 10 + Math.random() * 12,
        },
      ];
    });
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      spawnTrailParticle(e.clientX, e.clientY);
    },
    [spawnTrailParticle]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches && e.touches[0]) {
        spawnTrailParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [spawnTrailParticle]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  // Click/Tap heart burst & sound trigger
  useEffect(() => {
    const handlePointerDown = (e) => {
      const isButton = e.target.closest('button, a, input, [role="button"]');
      sounds.playChime(600 + Math.random() * 200, 0.15);

      if (isButton) return;

      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (!x && !y) return;

      const burst = document.createElement('div');
      const emojis = ['❤️', '💖', '✨', '🌸', '🌹'];
      burst.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      burst.style.cssText = `
        position: fixed;
        left: ${x - 14}px;
        top: ${y - 14}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9998;
        animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        filter: drop-shadow(0 0 12px rgba(225, 29, 72, 0.7));
      `;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 900);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <>
      {/* Desktop Ambient Cursor Glow */}
      <div
        className="cursor-glow hidden md:block"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
      />

      {/* Sparkle Trail Particles */}
      <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
        {trail.map((p) => {
          const age = Date.now() - p.created;
          const opacity = Math.max(0, 1 - age / 800);
          const scale = 1 + (age / 800) * 0.5;

          return (
            <div
              key={p.id}
              className="absolute select-none transition-opacity"
              style={{
                left: `${p.x}px`,
                top: `${p.y - (age / 800) * 20}px`,
                fontSize: `${p.size}px`,
                opacity,
                transform: `scale(${scale}) translate(-50%, -50%)`,
                filter: 'drop-shadow(0 0 8px rgba(243,229,171,0.8))',
              }}
            >
              {p.symbol}
            </div>
          );
        })}
      </div>

      {/* Ambient Background Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-burgundy/20 blur-[150px] animate-orb" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full bg-rose/15 blur-[160px] animate-orb"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[450px] h-[450px] rounded-full bg-champagne/10 blur-[140px] animate-orb"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      {/* Floating Particles (Hearts & Rose Petals) */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute select-none"
            style={{
              left: `${h.x}%`,
              bottom: '-30px',
              fontSize: `${h.size}px`,
              opacity: h.opacity,
              animation: `petalFall ${h.duration}s linear ${h.delay}s forwards`,
              animationDirection: 'reverse',
            }}
          >
            {h.type === 'petal' ? '🌸' : '♥'}
          </div>
        ))}
      </div>

      {/* Continuous Soft Background Rose Petals */}
      <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`bg-petal-${i}`}
            className="absolute text-rose/25 select-none"
            style={{
              left: `${10 + i * 16}%`,
              top: '-30px',
              fontSize: '1.6rem',
              animation: `petalFall ${11 + i * 2.5}s linear ${i * 3.5}s infinite`,
            }}
          >
            🌹
          </div>
        ))}
      </div>
    </>
  );
}
