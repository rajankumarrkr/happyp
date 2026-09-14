import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayCake({ isVisible }) {
  const { cake } = birthdayData;
  const [litCandles, setLitCandles] = useState(() =>
    Array.from({ length: cake.candleCount }, () => true)
  );
  const [showCelebration, setShowCelebration] = useState(false);

  const allBlown = useMemo(() => litCandles.every((c) => !c), [litCandles]);

  const blowCandle = (index) => {
    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Trigger celebration when all candles are blown
  useEffect(() => {
    if (allBlown && !showCelebration) {
      setTimeout(() => setShowCelebration(true), 500);
    }
  }, [allBlown, showCelebration]);

  const blowAllCandles = () => {
    litCandles.forEach((isLit, i) => {
      if (isLit) {
        setTimeout(() => blowCandle(i), i * 150);
      }
    });
  };

  const confettiColors = ['#FFB6C1', '#BE123C', '#800020', '#F5E6CC', '#d4a574', '#e1436a'];

  return (
    <section
      id="cake"
      className="section-container gradient-dark-rose relative py-12 md:py-20"
      aria-label="Birthday Cake"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose/5 blur-[100px]" />

      {isVisible && (
        <div className="relative z-10 text-center max-w-lg mx-auto w-full px-2 sm:px-4">
          {/* Celebration overlay */}
          <AnimatePresence>
            {showCelebration && (
              <>
                {/* Fireworks */}
                <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`fw-${i}`}
                      className="absolute"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${10 + Math.random() * 50}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.3,
                        repeat: 3,
                        repeatDelay: 2,
                      }}
                    >
                      {/* Firework burst */}
                      {Array.from({ length: 8 }).map((_, j) => (
                        <motion.div
                          key={j}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: confettiColors[j % confettiColors.length],
                          }}
                          animate={{
                            x: Math.cos((j * Math.PI * 2) / 8) * 60,
                            y: Math.sin((j * Math.PI * 2) / 8) * 60,
                            opacity: [1, 0],
                            scale: [1, 0],
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      ))}
                    </motion.div>
                  ))}

                  {/* Confetti */}
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={`conf-${i}`}
                      className="absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: '-10px',
                        width: `${6 + Math.random() * 6}px`,
                        height: `${6 + Math.random() * 6}px`,
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
            className="text-lg sm:text-2xl text-handwritten text-gradient-rose glow-text mb-8 sm:mb-10 px-2 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {allBlown ? cake.afterWish : cake.message}
          </motion.p>

          {/* Cake Container */}
          <motion.div
            className="relative inline-block max-w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Candles container */}
            <div className="flex justify-center gap-3 sm:gap-5 md:gap-6 mb-3 sm:mb-4 relative z-10">
              {litCandles.map((isLit, i) => (
                <motion.button
                  key={i}
                  className="flex flex-col items-center cursor-pointer group px-2 py-1.5 -mx-1 touch-manipulation focus:outline-none"
                  onClick={() => isLit && blowCandle(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`${isLit ? 'Blow' : 'Blown'} candle ${i + 1}`}
                >
                  {/* Flame */}
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        className="relative mb-1"
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-3 h-5 rounded-full animate-flicker"
                          style={{
                            background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 40%, #FF4500 100%)',
                            boxShadow: '0 0 10px rgba(255, 165, 0, 0.6), 0 0 20px rgba(255, 69, 0, 0.3)',
                          }}
                        />
                        {/* Glow */}
                        <div className="absolute -inset-2 bg-orange-400/20 rounded-full blur-sm" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle body */}
                  <div
                    className="w-3 h-12 sm:h-14 md:h-16 rounded-t-sm rounded-b-lg relative"
                    style={{
                      background: `linear-gradient(180deg, ${
                        ['#FFB6C1', '#BE123C', '#d4a574', '#e1436a', '#FFB6C1'][i % 5]
                      } 0%, ${
                        ['#FF69B4', '#8B0000', '#c4956d', '#c43060', '#FF69B4'][i % 5]
                      } 100%)`,
                    }}
                  >
                    {/* Stripe */}
                    <div className="absolute inset-x-0 top-1/3 h-[2px] bg-white/20" />
                  </div>

                  {/* Blow hint */}
                  {isLit && (
                    <span className="text-pink/60 sm:text-cream/0 sm:group-hover:text-cream/40 text-[10px] mt-1 transition-colors">
                      tap
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Cake body with responsive widths */}
            <div className="relative">
              {/* Top layer */}
              <div
                className="w-40 sm:w-48 md:w-56 h-9 sm:h-10 mx-auto rounded-t-2xl relative z-10"
                style={{
                  background: 'linear-gradient(180deg, #f0c8d0 0%, #e8a0b0 100%)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
              >
                {/* Frosting drips */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 sm:w-4 h-2.5 sm:h-3 rounded-b-full"
                      style={{ background: '#f0c8d0' }}
                    />
                  ))}
                </div>
              </div>

              {/* Middle layer */}
              <div
                className="w-44 sm:w-52 md:w-60 h-10 sm:h-12 mx-auto relative"
                style={{
                  background: 'linear-gradient(180deg, #d4756e 0%, #c46058 100%)',
                }}
              />

              {/* Bottom layer */}
              <div
                className="w-48 sm:w-56 md:w-64 h-12 sm:h-14 mx-auto rounded-b-2xl relative"
                style={{
                  background: 'linear-gradient(180deg, #c46058 0%, #a04040 100%)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                }}
              >
                {/* Decoration */}
                <div className="absolute inset-x-4 top-2.5 sm:top-3 flex justify-around">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-champagne/30"
                    />
                  ))}
                </div>
              </div>

              {/* Plate */}
              <div
                className="w-56 sm:w-64 md:w-72 h-3.5 sm:h-4 mx-auto rounded-b-xl"
                style={{
                  background: 'linear-gradient(180deg, #e8e0d8 0%, #d0c8c0 100%)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}
              />

              {/* Cake glow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 sm:w-48 h-8 bg-rose/10 rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* Action buttons and instructions */}
          {!allBlown ? (
            <div className="mt-6 flex flex-col items-center gap-3">
              <motion.button
                onClick={blowAllCandles}
                className="btn-romantic text-xs sm:text-sm py-2.5 px-6 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Blow All Candles 🎂✨</span>
              </motion.button>
              <p className="text-cream/40 text-xs tracking-wider">
                Or tap each candle to make a wish
              </p>
            </div>
          ) : (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-cream/70 text-elegant text-base sm:text-lg">
                May all your beautiful wishes come true, Pooja ✨❤️
              </p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
