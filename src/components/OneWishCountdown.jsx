import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Star } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function OneWishCountdown({ isVisible }) {
  const [countdown, setCountdown] = useState(null);
  const [wishReady, setWishReady] = useState(false);
  const [wishGranted, setWishGranted] = useState(false);

  const startCountdown = () => {
    sounds.playPop();
    setCountdown(5);
    setWishReady(false);
    setWishGranted(false);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      sounds.playChime(500 + (5 - countdown) * 60, 0.2);
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      sounds.playHarp();
      setWishReady(true);
    }
  }, [countdown]);

  const handleWishMade = () => {
    sounds.playFanfare();
    setWishGranted(true);
  };

  const confettiColors = ['#FFB6C1', '#BE123C', '#800020', '#F5E6CC', '#d4a574', '#e1436a'];

  return (
    <section
      id="onewish"
      className="section-container gradient-night-sky relative py-16 md:py-28"
      aria-label="One Birthday Wish"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-champagne/10 blur-[140px]" />

      {/* Fireworks after Wish Made */}
      <AnimatePresence>
        {wishGranted && (
          <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`fw-${i}`}
                className="absolute"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 50}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.6,
                  delay: i * 0.3,
                  repeat: 3,
                  repeatDelay: 1.5,
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
                      x: Math.cos((j * Math.PI * 2) / 8) * 70,
                      y: Math.sin((j * Math.PI * 2) / 8) * 70,
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{ duration: 1.1, delay: 0.2 }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {isVisible && (
        <div className="relative z-10 w-full max-w-lg mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-gold-light border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>🌠 One Wish Moment</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Make One Wish 🌠
          </motion.h2>

          <div className="glass-strong rounded-3xl p-6 sm:p-8 border-2 border-gold/30 shadow-2xl flex flex-col items-center gap-6 mt-6">
            {countdown === null && !wishGranted && (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center text-gold">
                  <Eye size={32} />
                </div>
                <p className="text-cream/90 text-lg font-serif">
                  “Close your eyes for 5 seconds…”
                </p>
                <motion.button
                  onClick={startCountdown}
                  className="btn-romantic text-sm py-3 px-8 shadow-xl"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start 5-Second Timer 👁️✨</span>
                </motion.button>
              </div>
            )}

            {countdown !== null && countdown > 0 && (
              <div className="flex flex-col items-center gap-3">
                <motion.span
                  key={countdown}
                  className="text-6xl sm:text-7xl font-serif text-gradient-rose font-bold glow-text"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {countdown}
                </motion.span>
                <p className="text-cream/70 text-sm font-serif italic">
                  Keep your eyes closed and think of your biggest wish...
                </p>
              </div>
            )}

            {wishReady && !wishGranted && (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center text-gold animate-bounce">
                  <Star className="fill-gold" size={32} />
                </div>
                <p className="text-xl font-serif text-cream font-medium">
                  “Now make one wish.”
                </p>
                <motion.button
                  onClick={handleWishMade}
                  className="btn-romantic text-base py-3 px-10 shadow-2xl"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={18} />
                  <span>✨ Wish Made ✨</span>
                </motion.button>
              </motion.div>
            )}

            {wishGranted && (
              <motion.div
                className="flex flex-col items-center gap-3 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-5xl mb-1">🎆</div>
                <p className="text-2xl sm:text-3xl text-handwritten text-gradient-rose font-bold glow-text">
                  “I hope your wish comes true. ❤️”
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
