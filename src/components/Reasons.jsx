import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Check } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function Reasons({ isVisible }) {
  const { reasons } = birthdayData;
  const [unlockedReasons, setUnlockedReasons] = useState({ 0: true });

  const unlockNext = (index) => {
    sounds.playPop();
    sounds.playChime(600 + index * 50, 0.25);
    setUnlockedReasons((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      id="reasons"
      className="section-container gradient-dark-rose relative py-16 md:py-28"
      aria-label="Why You Are Special"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-3 sm:px-4">
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-rose/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>Tap Each Crystal Heart To Unlock</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why You Are So Special ❤️
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-10 sm:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Just a few of the million reasons...
          </motion.p>

          {/* Crystal Hearts Stack */}
          <div className="space-y-4 sm:space-y-6">
            {reasons.map((reason, i) => {
              const isUnlocked = unlockedReasons[i];
              const isLast = i === reasons.length - 1;

              return (
                <motion.div
                  key={i}
                  className={`glass-strong p-4 sm:p-6 rounded-3xl border transition-all duration-400 ${
                    isUnlocked
                      ? isLast
                        ? 'border-gold bg-gradient-to-r from-burgundy/40 via-rose/20 to-burgundy/40 shadow-[0_15px_40px_rgba(225,29,72,0.4)]'
                        : 'border-pink/30 shadow-lg'
                      : 'border-white/10 opacity-70 cursor-pointer'
                  }`}
                  onClick={() => !isUnlocked && unlockNext(i)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Crystal Heart Button */}
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative cursor-pointer border shadow-md ${
                        isUnlocked
                          ? 'glass-rose border-rose text-rose'
                          : 'glass border-white/20 text-cream/40'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => !isUnlocked && unlockNext(i)}
                    >
                      <Heart className={isUnlocked ? 'fill-rose text-rose' : 'text-cream/40'} size={24} />
                      {isUnlocked && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center text-stone-900 text-[10px]">
                          <Check size={10} />
                        </div>
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono text-gold-light uppercase tracking-wider">Reason {reason.number}</span>
                      </div>

                      {isUnlocked ? (
                        isLast ? (
                          <div>
                            <p className="text-cream/80 text-sm font-serif mb-1">{reason.text}</p>
                            <motion.p
                              className="heading-cinematic text-2xl sm:text-4xl text-gradient-rose glow-text-strong font-serif"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', damping: 12 }}
                            >
                              {reason.highlight}
                            </motion.p>
                          </div>
                        ) : (
                          <p className="text-cream/90 text-base sm:text-lg font-serif leading-relaxed">
                            {reason.text}
                          </p>
                        )
                      ) : (
                        <p className="text-cream/40 text-xs sm:text-sm font-mono italic">
                          Tap heart to reveal reason #{reason.number}...
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
