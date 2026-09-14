import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

const cardVariants = [
  { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, scale: 0.95, y: 15 }, animate: { opacity: 1, scale: 1, y: 0 } },
  { initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, scale: 0.9, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 } },
  { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, scale: 0.85, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 } },
];

export default function Reasons({ isVisible }) {
  const { reasons } = birthdayData;

  return (
    <section
      id="reasons"
      className="section-container gradient-dark-rose relative py-12 md:py-24"
      aria-label="Why You Are Special"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose/5 blur-[120px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-2 sm:px-4">
          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-2xl sm:text-4xl md:text-5xl text-gradient-rose mb-3 sm:mb-4 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Do you know why you&apos;re special?
          </motion.h2>

          <motion.div
            className="w-16 h-[1px] mx-auto mb-8 sm:mb-12"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          {/* Reason cards */}
          <div className="space-y-3.5 sm:space-y-5">
            {reasons.map((reason, i) => {
              const variant = cardVariants[i % cardVariants.length];
              const isLast = i === reasons.length - 1;

              return (
                <motion.div
                  key={i}
                  className={`glass p-4 sm:p-5 md:p-6 ${isLast ? 'glass-rose glow-rose' : ''}`}
                  initial={variant.initial}
                  animate={variant.animate}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + i * 0.25,
                    type: isLast ? 'spring' : 'tween',
                    damping: 15,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <span className="text-rose/30 text-xs font-mono tracking-wider flex-shrink-0">
                      {reason.number}
                    </span>

                    {/* Divider */}
                    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-pink/20 to-transparent flex-shrink-0" />

                    {/* Text */}
                    <div className="text-left">
                      {isLast ? (
                        <div>
                          <p className="text-cream/60 text-sm mb-2">{reason.text}</p>
                          <motion.p
                            className="heading-cinematic text-2xl sm:text-3xl md:text-4xl text-gradient-rose glow-text-strong break-words"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.8 + reasons.length * 0.25 + 0.3,
                              type: 'spring',
                              damping: 10,
                            }}
                          >
                            {reason.highlight}
                          </motion.p>
                        </div>
                      ) : (
                        <p className="text-cream/85 text-elegant text-sm sm:text-base md:text-lg leading-relaxed">
                          {reason.text}
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
