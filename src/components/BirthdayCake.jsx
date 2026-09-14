import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function BirthdayCake({ isVisible }) {
  const { cake } = birthdayData;
  const candleCount = 15; // 15 birthday candles
  const [litCandles, setLitCandles] = useState(() =>
    Array.from({ length: candleCount }, () => true)
  );
  const [showCelebration, setShowCelebration] = useState(false);

  const allBlown = useMemo(() => litCandles.every((c) => !c), [litCandles]);

  const blowCandle = (index) => {
    sounds.playBlow();
    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Trigger lights off & fireworks celebration when all candles blown
  useEffect(() => {
    if (allBlown && !showCelebration) {
      sounds.playFanfare();
      setTimeout(() => setShowCelebration(true), 300);
    }
  }, [allBlown, showCelebration]);

  const blowAllCandles = () => {
    litCandles.forEach((isLit, i) => {
      if (isLit) {
        setTimeout(() => blowCandle(i), i * 70);
      }
    });
  };

  const confettiColors = ['#FFB6C1', '#BE123C', '#800020', '#F5E6CC', '#d4a574', '#e1436a', '#fde8e8'];

  return (
    <section
      id="cake"
      className={`section-container relative py-16 md:py-28 transition-colors duration-1000 ${
        showCelebration ? 'bg-black' : 'gradient-dark-rose'
      }`}
      aria-label="Birthday Cake"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[140px]" />

      {isVisible && (
        <div className="relative z-10 text-center max-w-xl mx-auto w-full px-3 sm:px-4">
          {/* Celebration overlay */}
          <AnimatePresence>
            {showCelebration && (
              <>
                <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={`fw-${i}`}
                      className="absolute"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 50}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.6,
                        delay: i * 0.25,
                        repeat: 4,
                        repeatDelay: 1.2,
                      }}
                    >
                      {Array.from({ length: 8 }).map((_, j) => (
                        <motion.div
                          key={j}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: confettiColors[j % confettiColors.length],
                          }}
                          animate={{
                            x: Math.cos((j * Math.PI * 2) / 8) * 80,
                            y: Math.sin((j * Math.PI * 2) / 8) * 80,
                            opacity: [1, 0],
                            scale: [1, 0],
                          }}
                          transition={{ duration: 1.1, delay: 0.2 }}
                        />
                      ))}
                    </motion.div>
                  ))}

                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={`conf-${i}`}
                      className="absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: '-10px',
                        width: `${6 + Math.random() * 7}px`,
                        height: `${6 + Math.random() * 7}px`,
                        backgroundColor: confettiColors[i % confettiColors.length],
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animation: `confetti-fall ${3 + Math.random() * 3}s ease-in ${Math.random() * 2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.p
            className="text-2xl sm:text-4xl text-handwritten text-gradient-rose glow-text mb-6 sm:mb-10 px-2 leading-relaxed font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {allBlown ? "HAPPY BIRTHDAY MERI JAAN ❤️" : cake.message}
          </motion.p>

          {/* 15 Candle Decorated 3D Cake Container */}
          <motion.div
            className="relative inline-block max-w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* 15 Candles Row */}
            <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 max-w-xs sm:max-w-md mx-auto mb-2 relative z-10">
              {litCandles.map((isLit, i) => (
                <motion.button
                  key={i}
                  className="flex flex-col items-center cursor-pointer group px-1 py-0.5 touch-manipulation focus:outline-none"
                  onClick={() => isLit && blowCandle(i)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  aria-label={`Candle ${i + 1}`}
                >
                  {/* Flame */}
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        className="relative mb-0.5"
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-2.5 h-4.5 rounded-full animate-flicker"
                          style={{
                            background: 'linear-gradient(180deg, #FFF59D 0%, #FFB74D 40%, #FF3D00 100%)',
                            boxShadow: '0 0 10px rgba(255, 183, 77, 0.8), 0 0 20px rgba(255, 61, 0, 0.4)',
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle Body */}
                  <div
                    className="w-2.5 h-10 sm:h-12 rounded-t-sm rounded-b-md relative shadow-md"
                    style={{
                      background: `linear-gradient(180deg, ${
                        ['#fbcfe8', '#e11d48', '#d4af37', '#fb7185', '#fbcfe8'][i % 5]
                      } 0%, ${
                        ['#f472b6', '#9e1b36', '#aa771c', '#e11d48', '#f472b6'][i % 5]
                      } 100%)`,
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Multi-Tier Cake Body */}
            <div className="relative select-none">
              {/* Top Layer */}
              <div
                className="w-48 sm:w-60 md:w-68 h-10 sm:h-12 mx-auto rounded-t-3xl relative z-10 shadow-lg border-b border-rose/30"
                style={{
                  background: 'linear-gradient(180deg, #fce7f3 0%, #f472b6 100%)',
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 sm:w-4 h-3 sm:h-3.5 rounded-b-full shadow-sm"
                      style={{ background: '#fce7f3' }}
                    />
                  ))}
                </div>
              </div>

              {/* Middle Layer */}
              <div
                className="w-52 sm:w-64 md:w-72 h-11 sm:h-13 mx-auto relative border-b border-rose/40"
                style={{
                  background: 'linear-gradient(180deg, #fb7185 0%, #e11d48 100%)',
                }}
              >
                <div className="absolute inset-x-4 top-2 flex justify-around">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="text-xs">🍓</span>
                  ))}
                </div>
              </div>

              {/* Bottom Layer */}
              <div
                className="w-56 sm:w-68 md:w-80 h-13 sm:h-15 mx-auto rounded-b-3xl relative shadow-2xl"
                style={{
                  background: 'linear-gradient(180deg, #be123c 0%, #6b051b 100%)',
                }}
              >
                <div className="absolute inset-x-6 top-3 flex justify-around">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-champagne shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Cake Plate */}
              <div
                className="w-64 sm:w-76 md:w-88 h-4 sm:h-5 mx-auto rounded-b-2xl border-t border-white/40"
                style={{
                  background: 'linear-gradient(180deg, #fef08a 0%, #d4af37 100%)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          </motion.div>

          {/* Controls & Ending Banner */}
          {!allBlown ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <motion.button
                onClick={blowAllCandles}
                className="btn-romantic text-sm py-3 px-8 shadow-xl"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Blow 15 Candles 🎂✨</span>
              </motion.button>
              <p className="text-cream/50 text-xs tracking-wider font-mono">
                Or tap each candle to blow them out one by one
              </p>
            </div>
          ) : (
            <motion.div
              className="mt-8 glass-strong p-6 rounded-3xl border-2 border-gold shadow-2xl space-y-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="heading-cinematic text-2xl sm:text-3xl text-gradient-rose font-serif">
                HAPPY BIRTHDAY MERI JAAN ❤️
              </h3>
              <p className="text-gold-light text-sm sm:text-base font-serif italic pt-1">
                “15 September — the day my favourite person came into this world.”
              </p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
