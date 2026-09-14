import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function Intro({ onComplete }) {
  const [stage, setStage] = useState(0);
  // 0 = initial messages, 1 = "Don't open yet", 2 = "Okay let's begin"

  const messages = birthdayData.heroMessages;

  return (
    <section
      id="intro"
      className="section-container gradient-romantic relative"
      aria-label="Introduction"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? 'rgba(255, 182, 193, 0.4)'
                : i % 3 === 1
                ? 'rgba(190, 18, 60, 0.3)'
                : 'rgba(245, 230, 204, 0.2)',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating hearts in background */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-rose/10"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontSize: `${1.5 + Math.random() * 2}rem`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.div>
        ))}

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-burgundy/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto w-full px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="messages"
              className="flex flex-col items-center gap-4 sm:gap-6"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {messages.map((msg, i) => (
                <motion.p
                  key={i}
                  className={`${
                    i === 0
                      ? 'text-2xl sm:text-4xl md:text-5xl text-handwritten text-gradient-rose glow-text leading-tight'
                      : i === 1
                      ? 'text-base sm:text-lg md:text-xl text-cream/75 text-elegant'
                      : 'text-sm sm:text-base md:text-lg text-pink-soft/70'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 1.5 + 0.5 }}
                >
                  {msg}
                </motion.p>
              ))}

              <motion.button
                className="btn-romantic mt-6 sm:mt-8 w-auto px-7 py-3.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setStage(1)}
              >
                <span>Don&apos;t Open Yet ❤️</span>
              </motion.button>
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="promise"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ❤️
              </motion.div>

              <motion.p
                className="text-2xl md:text-3xl text-handwritten text-gradient-rose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I knew you&apos;d click it anyway...
              </motion.p>

              <motion.p
                className="text-cream/50 text-elegant text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Some things are meant to be discovered.
              </motion.p>

              <motion.button
                className="btn-romantic mt-6 animate-pulse-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setStage(2);
                  setTimeout(onComplete, 1000);
                }}
              >
                <span>Okay... Let&apos;s Begin ❤️</span>
              </motion.button>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="transition"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-5xl"
                animate={{
                  scale: [1, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                ❤️
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
