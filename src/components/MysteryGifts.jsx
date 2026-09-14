import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function MysteryGifts({ isVisible }) {
  const [openedGifts, setOpenedGifts] = useState({});
  const { gifts } = birthdayData;

  const openGift = (index) => {
    sounds.playPop();
    sounds.playHarp();
    setOpenedGifts((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      id="gifts"
      className="section-container gradient-dark-rose relative py-16 md:py-28"
      aria-label="Mystery Gifts"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-gold-light border border-gold/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>Unwrap Whenever You Need Me</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-4xl md:text-5xl text-gradient-rose mb-3 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Three Little Surprises ❤️
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-10 sm:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Each one is waiting for the right moment
          </motion.p>

          {/* Gift Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {gifts.map((gift, i) => {
              const isOpened = openedGifts[i];

              return (
                <motion.div
                  key={i}
                  className="glass-strong p-6 sm:p-7 flex flex-col items-center justify-between gap-5 border border-pink/20 shadow-xl rounded-3xl relative overflow-hidden"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {!isOpened ? (
                      <motion.div
                        key="closed"
                        className="flex flex-col items-center gap-5 w-full my-auto"
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        {/* 3D Animated Gift Box Icon */}
                        <motion.div
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl glass-rose flex items-center justify-center relative cursor-pointer border-2 border-pink/30 shadow-[0_10px_30px_rgba(225,29,72,0.3)]"
                          whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openGift(i)}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Gift className="text-pink drop-shadow-md" size={44} />

                          {/* Glowing ribbon */}
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-transparent via-gold to-transparent opacity-80" />

                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose rounded-full animate-ping" />
                        </motion.div>

                        {/* Label */}
                        <p className="text-cream/80 text-sm sm:text-base font-serif italic max-w-[200px]">
                          &ldquo;{gift.label}&rdquo;
                        </p>

                        {/* Open Button */}
                        <motion.button
                          className="btn-romantic text-xs sm:text-sm py-2.5 px-6"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openGift(i)}
                        >
                          <span>Open Gift {gift.emoji}</span>
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="opened"
                        className="flex flex-col items-center gap-4 text-left my-auto w-full"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                      >
                        <div className="w-full flex items-center justify-between border-b border-cream/15 pb-2">
                          <span className="text-xs font-mono text-gold-light uppercase tracking-wider">Surprise #{i + 1}</span>
                          <Heart className="text-rose fill-rose" size={16} />
                        </div>

                        <p className="text-cream/90 text-sm sm:text-base leading-relaxed font-serif pt-1">
                          {gift.message}
                        </p>

                        <div className="w-full text-right mt-2">
                          <span className="text-xs text-pink-soft/60 font-serif italic">— Always yours ❤️</span>
                        </div>
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
