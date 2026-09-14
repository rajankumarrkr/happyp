import { useState } from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayReveal({ isVisible }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { birthdayReveal } = birthdayData;

  const confettiColors = ['#FFB6C1', '#BE123C', '#800020', '#F5E6CC', '#d4a574', '#e1436a', '#ffd1d9'];

  return (
    <section
      id="birthday"
      className="section-container gradient-dark-rose relative"
      aria-label="Birthday Reveal"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-burgundy/8 blur-[120px]" />

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                backgroundColor: confettiColors[i % confettiColors.length],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animation: `confetti-fall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Heart particles */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-rose/40"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${1 + Math.random() * 1.5}rem`,
              }}
              initial={{ y: '110vh', opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 3,
                repeat: Infinity,
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      )}

      {isVisible && (
        <div className="relative z-10 text-center max-w-2xl mx-auto w-full px-4 sm:px-6">
          {/* Date */}
          <motion.p
            className="text-base sm:text-xl md:text-2xl text-elegant text-gold-light tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {birthdayReveal.date}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-20 sm:w-24 h-[1px] mx-auto mb-6 sm:mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-cream/70 text-elegant mb-8 sm:mb-12 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            {birthdayReveal.subtitle}
          </motion.p>

          {/* Main greeting */}
          <motion.h1
            className="heading-cinematic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-rose glow-text-strong mb-6 sm:mb-8 leading-tight break-words px-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.2, type: 'spring', damping: 15 }}
            onAnimationComplete={() => setShowConfetti(true)}
          >
            {birthdayReveal.greeting}
          </motion.h1>

          {/* Sub messages */}
          {birthdayReveal.messages.map((msg, i) => (
            <motion.p
              key={i}
              className="text-sm sm:text-base md:text-lg text-cream/60 text-elegant mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3 + i * 0.5 }}
            >
              {msg}
            </motion.p>
          ))}

          {/* Decorative hearts */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            {['✦', '❤️', '✦'].map((char, i) => (
              <motion.span
                key={i}
                className={i === 1 ? 'text-2xl' : 'text-sm text-gold/40'}
                animate={
                  i === 1
                    ? { scale: [1, 1.2, 1] }
                    : { opacity: [0.3, 0.7, 0.3] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
