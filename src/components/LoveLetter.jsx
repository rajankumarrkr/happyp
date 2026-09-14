import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function LoveLetter({ isVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const { loveLetter } = birthdayData;

  return (
    <section
      id="letter"
      className="section-container gradient-dark-rose relative"
      aria-label="Love Letter"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-burgundy/5 blur-[100px]" />

      {isVisible && (
        <div className="relative z-10 text-center max-w-lg mx-auto w-full px-2 sm:px-4">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Envelope closed state */
              <motion.div
                key="closed"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                {/* Envelope icon */}
                <motion.div
                  className="relative"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-32 h-24 sm:w-40 sm:h-28 relative">
                    {/* Envelope body */}
                    <div className="absolute inset-0 rounded-lg glass-rose overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Mail className="text-pink/60" size={40} />
                      </div>
                    </div>
                    {/* Envelope flap */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                      style={{
                        background: 'linear-gradient(180deg, rgba(128,0,32,0.4), rgba(128,0,32,0.2))',
                        borderRadius: '0.5rem 0.5rem 0 0',
                        clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      }}
                    />
                    {/* Heart seal */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl z-10"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💌
                    </motion.div>
                  </div>

                  {/* Glow beneath */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose/10 rounded-full blur-xl" />
                </motion.div>

                <motion.p
                  className="text-cream/70 text-elegant text-base sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {loveLetter.envelope}
                </motion.p>

                <motion.button
                  className="btn-romantic animate-pulse-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsOpen(true)}
                >
                  <span>{loveLetter.buttonText}</span>
                </motion.button>
              </motion.div>
            ) : (
              /* Letter open state */
              <motion.div
                key="open"
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Letter paper */}
                <motion.div
                  className="w-full max-w-md relative"
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, type: 'spring', damping: 20 }}
                >
                  {/* Paper texture */}
                  <div
                    className="rounded-2xl p-5 sm:p-8 relative overflow-hidden text-stone-800 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #FFF8F0 0%, #f5ede0 50%, #efe5d5 100%)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(128, 0, 32, 0.1)',
                    }}
                  >
                    {/* Paper texture overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Letter content */}
                    <div className="relative z-10 text-left">
                      {loveLetter.content.map((line, i) => (
                        <motion.p
                          key={i}
                          className={`${
                            line === ''
                              ? 'h-3'
                              : i === 0
                              ? 'text-2xl text-handwritten text-burgundy mb-2'
                              : line.startsWith('Forever') || line.startsWith('Yours')
                              ? 'text-lg text-handwritten text-burgundy mt-1'
                              : 'text-sm md:text-base leading-relaxed text-stone-700'
                          }`}
                          style={{ fontFamily: i === 0 || line.startsWith('Forever') || line.startsWith('Yours') ? 'var(--font-handwritten)' : 'var(--font-elegant)' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-3 right-3 text-burgundy/20 text-2xl">❤</div>
                    <div className="absolute bottom-3 left-3 text-burgundy/10 text-lg">✦</div>
                  </div>
                </motion.div>

                {/* Floating particles around letter */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute text-pink/30"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      fontSize: '0.5rem',
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    ✦
                  </motion.div>
                ))}

                {/* Close hint */}
                <motion.button
                  className="btn-ghost mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.02 }}
                >
                  <span>Close Letter ✦</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
