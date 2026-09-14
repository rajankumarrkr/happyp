import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function LoveLetter({ isVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const { loveLetter } = birthdayData;

  const handleOpen = () => {
    sounds.playPop();
    sounds.playHarp();
    setIsOpen(true);
  };

  return (
    <section
      id="letter"
      className="section-container gradient-dark-rose relative py-16 md:py-28"
      aria-label="Love Letter"
    >
      {/* Background glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 text-center max-w-xl mx-auto w-full px-3 sm:px-6">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Envelope closed state with 3D Wax Seal */
              <motion.div
                key="closed"
                className="flex flex-col items-center gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs text-pink-soft/90">
                  <Sparkles size={13} className="text-gold" />
                  <span>Private & Confidential • Only For Meri Jaan</span>
                </div>

                {/* 3D Envelope container */}
                <motion.div
                  className="relative group cursor-pointer"
                  onClick={handleOpen}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div className="w-64 h-44 sm:w-80 sm:h-52 relative rounded-2xl glass-strong border border-gold/30 shadow-[0_20px_50px_rgba(107,5,27,0.5)] overflow-hidden flex flex-col justify-between p-4">
                    {/* Flap outline decorative gradient */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1/2"
                      style={{
                        background: 'linear-gradient(180deg, rgba(225,29,72,0.3) 0%, rgba(107,5,27,0.1) 100%)',
                        clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      }}
                    />

                    {/* Outer border trim */}
                    <div className="absolute inset-2 border border-gold/15 rounded-xl pointer-events-none" />

                    {/* Stamp / Air Mail badge */}
                    <div className="absolute top-3 right-3 text-right">
                      <div className="w-8 h-9 rounded border border-gold/40 glass-gold flex items-center justify-center text-[10px] font-serif text-gold">
                        ❤️
                      </div>
                    </div>

                    {/* Address snippet */}
                    <div className="my-auto text-left pl-3">
                      <p className="text-[11px] font-mono text-gold-light/60 tracking-wider uppercase">Deliver To:</p>
                      <p className="text-sm font-serif text-cream font-medium tracking-wide">Meri Jaan ❤️</p>
                      <p className="text-[10px] text-pink-soft/50 font-sans">Straight from the Heart</p>
                    </div>

                    {/* Wax Seal Button in Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg relative border-2 border-gold/50 cursor-pointer"
                        style={{
                          background: 'radial-gradient(circle, #e11d48 0%, #6b051b 100%)',
                          boxShadow: '0 0 20px rgba(225,29,72,0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
                        }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Heart className="text-champagne fill-champagne/30" size={22} />
                        <div className="absolute -bottom-5 whitespace-nowrap text-[9px] font-mono tracking-widest text-gold-light uppercase">
                          Click Seal
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Ground Glow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-10 bg-rose/20 rounded-full blur-2xl pointer-events-none" />
                </motion.div>

                <motion.p
                  className="text-cream/70 text-elegant text-base sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {loveLetter.envelope}
                </motion.p>

                <motion.button
                  className="btn-romantic animate-pulse-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleOpen}
                >
                  <Mail size={16} />
                  <span>{loveLetter.buttonText}</span>
                </motion.button>
              </motion.div>
            ) : (
              /* Open Letter state with rich paper parchment aesthetic */
              <motion.div
                key="open"
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="w-full max-w-lg relative"
                  initial={{ y: 60, opacity: 0, scale: 0.92 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: 'spring', damping: 22 }}
                >
                  {/* Textured vintage paper card */}
                  <div
                    className="rounded-3xl p-6 sm:p-10 relative overflow-hidden text-stone-800 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border-2 border-gold/30"
                    style={{
                      background: 'linear-gradient(135deg, #fffdf8 0%, #f7f0e4 50%, #eee3d0 100%)',
                    }}
                  >
                    {/* Gold corner ornaments */}
                    <div className="absolute top-3 left-3 text-gold/60 text-lg select-none">✦</div>
                    <div className="absolute top-3 right-3 text-gold/60 text-lg select-none">✦</div>
                    <div className="absolute bottom-3 left-3 text-gold/60 text-lg select-none">✦</div>
                    <div className="absolute bottom-3 right-3 text-gold/60 text-lg select-none">✦</div>

                    {/* Paper texture overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.04] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Letter Body Text */}
                    <div className="relative z-10 text-left space-y-2">
                      {loveLetter.content.map((line, i) => (
                        <motion.p
                          key={i}
                          className={`${
                            line === ''
                              ? 'h-3'
                              : i === 0
                              ? 'text-3xl font-serif text-burgundy font-medium mb-3 border-b border-burgundy/15 pb-2 text-gradient-rose'
                              : line.startsWith('Forever') || line.startsWith('Yours')
                              ? 'text-xl text-handwritten text-burgundy font-semibold mt-2'
                              : 'text-sm sm:text-base leading-relaxed text-stone-700 font-serif'
                          }`}
                          style={{
                            fontFamily:
                              i === 0 || line.startsWith('Forever') || line.startsWith('Yours')
                                ? 'var(--font-handwritten)'
                                : 'var(--font-elegant)',
                          }}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="btn-ghost mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.04 }}
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
