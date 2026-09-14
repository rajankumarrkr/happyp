import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function StarWish({ isVisible }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const { starWish } = birthdayData;

  useEffect(() => {
    if (!isVisible) return;

    const timers = starWish.lines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), (i + 1) * 2500)
    );

    const finalTimer = setTimeout(
      () => setShowFinal(true),
      (starWish.lines.length + 1) * 2500
    );

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [isVisible, starWish.lines]);

  return (
    <section
      id="stars"
      className="section-container gradient-night-sky relative min-h-screen"
      aria-label="Star Wish"
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cream"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}

        {/* Shooting stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`shoot-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 30}%`,
              top: `${10 + i * 15}%`,
            }}
          >
            <div
              className="w-[2px] h-[60px] bg-gradient-to-b from-cream/60 to-transparent rounded-full"
              style={{
                animation: `shooting-star ${2 + i}s ease-in ${3 + i * 5}s infinite`,
                transformOrigin: 'top center',
              }}
            />
          </div>
        ))}

        {/* Moon glow */}
        <div className="absolute top-[10%] right-[10%] w-16 h-16 rounded-full bg-champagne/5 blur-xl" />
        <div className="absolute top-[10%] right-[10%] w-8 h-8 rounded-full bg-champagne/10 blur-sm" />
      </div>

      {isVisible && (
        <div className="relative z-10 text-center max-w-xl mx-auto w-full px-4 sm:px-6">
          {/* Lines */}
          <div className="space-y-5 sm:space-y-8 mb-8 sm:mb-12">
            {starWish.lines.map((line, i) => (
              <motion.p
                key={i}
                className="text-base sm:text-lg md:text-xl text-cream/75 text-elegant leading-relaxed px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  i < visibleLines
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Final reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              showFinal
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 1.2, type: 'spring', damping: 15 }}
          >
            <h2 className="heading-cinematic text-2xl sm:text-4xl md:text-5xl text-gradient-rose glow-text-strong px-2 leading-tight break-words">
              {starWish.final}
            </h2>
          </motion.div>

          {/* Decorative bottom stars */}
          <motion.div
            className="flex justify-center gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={showFinal ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {['✦', '⭒', '✦'].map((star, i) => (
              <motion.span
                key={i}
                className="text-gold/30 text-sm"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {star}
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
