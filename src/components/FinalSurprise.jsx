import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function FinalSurprise({ isVisible }) {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const { finalSurprise } = birthdayData;

  const allItems = useMemo(() => [
    ...finalSurprise.lines.map((l) => ({ ...l, type: 'line' })),
    ...finalSurprise.reveals.map((r) => ({ ...r, type: 'reveal' })),
    { ...finalSurprise.climax, type: 'climax' },
    { ...finalSurprise.closing, type: 'closing' },
  ], [finalSurprise]);

  useEffect(() => {
    if (!isVisible) return;

    const timers = allItems.map((item, i) =>
      setTimeout(() => setVisibleIndex(i), item.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible, allItems]);

  const confettiColors = ['#FFB6C1', '#BE123C', '#800020', '#F5E6CC', '#d4a574', '#e1436a', '#ffd1d9'];

  return (
    <section
      id="final"
      className="section-container gradient-night-sky relative min-h-screen"
      aria-label="Final Surprise"
    >
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cream"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              opacity: 0.2 + (i % 5) * 0.1,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 3)}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Fireworks (after climax) */}
      {visibleIndex >= allItems.length - 2 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`fw-${i}`}
              className="absolute"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${5 + (i * 9) % 60}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {Array.from({ length: 6 }).map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: confettiColors[j % confettiColors.length],
                  }}
                  animate={{
                    x: Math.cos((j * Math.PI * 2) / 6) * 40,
                    y: Math.sin((j * Math.PI * 2) / 6) * 40,
                    opacity: [1, 0],
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              ))}
            </motion.div>
          ))}

          {/* Floating hearts */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-rose/30"
              style={{
                left: `${(i * 6.6) % 100}%`,
                fontSize: `${0.9 + (i % 3) * 0.4}rem`,
              }}
              initial={{ y: '110vh', opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 0.5, 0] }}
              transition={{
                duration: 5 + (i % 4),
                delay: (i % 3),
                repeat: Infinity,
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      )}

      {isVisible && (
        <div className="relative z-20 text-center max-w-2xl mx-auto w-full px-4 sm:px-6">
          {allItems.map((item, i) => {
            if (i > visibleIndex) return null;

            if (item.type === 'line') {
              return (
                <motion.p
                  key={i}
                  className="text-base sm:text-lg md:text-xl text-cream/70 text-elegant mb-4 sm:mb-6 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {item.text}
                </motion.p>
              );
            }

            if (item.type === 'reveal') {
              return (
                <motion.h2
                  key={i}
                  className="heading-cinematic text-xl sm:text-3xl md:text-4xl text-gradient-rose glow-text-strong mb-4 sm:mb-6 leading-tight break-words px-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, type: 'spring', damping: 15 }}
                >
                  {item.text}
                </motion.h2>
              );
            }

            if (item.type === 'climax') {
              return (
                <motion.div key={i} className="my-8 sm:my-12 px-2">
                  <motion.h1
                    className="heading-cinematic text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight break-words"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, type: 'spring', damping: 10 }}
                  >
                    <span className="text-handwritten text-gradient-rose glow-text-strong">
                      {item.text}
                    </span>
                  </motion.h1>
                </motion.div>
              );
            }

            if (item.type === 'closing') {
              return (
                <motion.div
                  key={i}
                  className="mt-6 sm:mt-8 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-handwritten text-gold-light mb-3 sm:mb-4">
                    {item.date}
                  </p>
                  <p className="text-cream/60 text-elegant text-xs sm:text-sm md:text-base leading-relaxed">
                    {item.message}
                  </p>

                  <motion.div
                    className="flex justify-center gap-4 mt-10"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-gold/30 text-sm">✦</span>
                    <span className="text-rose/50">❤️</span>
                    <span className="text-gold/30 text-sm">✦</span>
                  </motion.div>

                  <motion.p
                    className="text-cream/20 text-xs mt-8 tracking-widest font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    Made with all my love, just for you.
                  </motion.p>
                </motion.div>
              );
            }

            return null;
          })}
        </div>
      )}
    </section>
  );
}
