import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function MysteryGifts({ isVisible }) {
  const [openedGifts, setOpenedGifts] = useState({});
  const { gifts } = birthdayData;

  const openGift = (index) => {
    setOpenedGifts((prev) => ({ ...prev, [index]: true }));
  };

  const giftAnimations = [
    // Gift 1: Shake and pop
    {
      closed: { rotate: [0, -5, 5, -5, 5, 0] },
      closedTransition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
      open: { scale: [0, 1.2, 1], rotate: [0, 10, -5, 0] },
    },
    // Gift 2: Pulse glow
    {
      closed: { scale: [1, 1.05, 1] },
      closedTransition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      open: { y: [30, -10, 0], opacity: [0, 1] },
    },
    // Gift 3: Float
    {
      closed: { y: [0, -8, 0] },
      closedTransition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      open: { scale: [0.5, 1.1, 1], rotateY: [90, 0] },
    },
  ];

  return (
    <section
      id="gifts"
      className="section-container gradient-dark-rose relative py-16 md:py-24"
      aria-label="Mystery Gifts"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose/5 blur-[100px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-2 sm:px-4">
          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-2xl sm:text-3xl md:text-4xl text-gradient-rose mb-3 sm:mb-4 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Three Little Surprises ❤️
          </motion.h2>

          <motion.p
            className="text-cream/50 text-elegant text-sm sm:text-lg mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Each one is waiting for the right moment
          </motion.p>

          {/* Gift boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {gifts.map((gift, i) => {
              const anim = giftAnimations[i];
              const isOpened = openedGifts[i];

              return (
                <motion.div
                  key={i}
                  className="glass p-5 sm:p-6 flex flex-col items-center gap-3.5 sm:gap-4 border border-pink/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {!isOpened ? (
                      <motion.div
                        key="closed"
                        className="flex flex-col items-center gap-4"
                      >
                        {/* Gift icon */}
                        <motion.div
                          className="w-20 h-20 rounded-2xl glass-rose flex items-center justify-center text-3xl relative"
                          animate={anim.closed}
                          transition={anim.closedTransition}
                        >
                          <Gift className="text-pink" size={32} />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose rounded-full animate-pulse" />
                        </motion.div>

                        {/* Label */}
                        <p className="text-cream/60 text-sm text-elegant italic">
                          {gift.label}
                        </p>

                        {/* Open button */}
                        <motion.button
                          className="btn-ghost text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openGift(i)}
                        >
                          <span>Open {gift.emoji}</span>
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="opened"
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={anim.open}
                        transition={{ duration: 0.6, type: 'spring', damping: 15 }}
                      >
                        {/* Opened state */}
                        <motion.div
                          className="text-4xl"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💝
                        </motion.div>

                        <p className="text-cream/80 text-sm leading-relaxed text-elegant">
                          {gift.message}
                        </p>

                        {/* Sparkle */}
                        {Array.from({ length: 4 }).map((_, j) => (
                          <motion.span
                            key={j}
                            className="absolute text-gold/40 text-xs"
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${20 + Math.random() * 60}%`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: j * 0.5,
                            }}
                          >
                            ✦
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
