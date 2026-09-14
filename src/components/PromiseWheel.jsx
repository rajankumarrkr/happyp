import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Award, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const promises = [
  { id: 1, title: 'Unlimited Ice Cream 🍦', desc: 'Valid anytime, anywhere. Your favorite flavor on demand!', color: '#e11d48' },
  { id: 2, title: '100% Movie Control 🎬', desc: 'You pick what we watch, no questions asked, even if it is a 3-hour drama!', color: '#be123c' },
  { id: 3, title: 'Always Listening 🎧', desc: 'Unlimited rant session coupon. I will listen attentively and agree with you!', color: '#9e1b36' },
  { id: 4, title: 'Late Night Stargazing 🌌', desc: 'A long drive under the stars with your favorite playlist playing.', color: '#6b051b' },
  { id: 5, title: 'Infinite Hugs & Comfort 🤗', desc: 'Whenever you feel low or tired, warm hugs guaranteed 24/7.', color: '#d4af37' },
  { id: 6, title: 'Queen Treatment 👑', desc: 'Full royal treatment day: breakfast, pampering, and all smiles.', color: '#e11d48' },
];

export default function PromiseWheel({ isVisible }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPromise, setSelectedPromise] = useState(null);

  const spinWheel = () => {
    if (spinning) return;
    sounds.playPop();
    setSpinning(true);
    setSelectedPromise(null);

    // Calculate random spin (at least 5 full turns + random segment)
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 1800 + extraDegrees;
    setRotation(totalRotation);

    // Play spinning chime ticks
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        sounds.playChime(400 + i * 20, 0.05);
      }, i * 150);
    }

    setTimeout(() => {
      setSpinning(false);
      sounds.playFanfare();

      // Determine winning segment
      const normalizedDegree = (360 - (totalRotation % 360)) % 360;
      const segmentAngle = 360 / promises.length;
      const winIndex = Math.floor(normalizedDegree / segmentAngle) % promises.length;
      setSelectedPromise(promises[winIndex]);
    }, 3500);
  };

  return (
    <section
      id="promises"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Wheel of Sweet Promises"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-3 sm:px-4">
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-gold-light border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>Redeemable Anytime • Guaranteed Promises</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Wheel of Sweet Promises 🎡
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Spin to unlock a special birthday promise for you!
          </motion.p>

          {/* Wheel Container */}
          <div className="relative flex flex-col items-center justify-center my-4">
            {/* Golden Pointer Pin at top */}
            <div className="z-30 -mb-5 flex flex-col items-center">
              <div className="w-6 h-8 bg-gradient-to-b from-champagne to-gold clip-triangle shadow-lg border-t border-white" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
            </div>

            {/* Spinning Canvas Circle */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full relative p-2 glass-strong border-4 border-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div
                className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-[3500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {promises.map((promise, index) => {
                  const angle = (360 / promises.length) * index;
                  return (
                    <div
                      key={promise.id}
                      className="absolute inset-0 origin-center flex items-start justify-center pt-4"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      <div className="text-center max-w-[90px] pt-2">
                        <span className="text-[11px] sm:text-xs font-serif font-semibold text-cream leading-tight block drop-shadow">
                          {promise.title}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Decorative radial dividing lines */}
                {promises.map((_, index) => (
                  <div
                    key={`line-${index}`}
                    className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gold/30 origin-center"
                    style={{ transform: `rotate(${(360 / promises.length) * index}deg)` }}
                  />
                ))}
              </div>

              {/* Center Heart Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-strong border-2 border-gold flex items-center justify-center shadow-xl z-20">
                <Heart className="text-rose fill-rose" size={24} />
              </div>
            </div>

            {/* Spin Button */}
            <motion.button
              onClick={spinWheel}
              disabled={spinning}
              className="btn-romantic mt-8 text-base px-9 py-3.5 shadow-2xl disabled:opacity-50"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{spinning ? 'Spinning Magic... 🎡' : 'Spin the Wheel! 🎡'}</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Coupon Win Modal */}
      <AnimatePresence>
        {selectedPromise && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedPromise(null)} />
            <motion.div
              className="relative z-10 w-full max-w-sm glass-strong rounded-3xl p-6 text-center border-2 border-gold shadow-[0_20px_60px_rgba(225,29,72,0.5)]"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <button
                onClick={() => setSelectedPromise(null)}
                className="absolute top-3 right-3 text-cream/60 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 rounded-full glass-gold mx-auto mb-3 flex items-center justify-center text-gold">
                <Award size={30} />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-gold-light uppercase block mb-1">
                Official Birthday Promise Coupon
              </span>

              <h3 className="heading-cinematic text-2xl text-gradient-rose mb-2 font-serif">
                {selectedPromise.title}
              </h3>

              <p className="text-cream/80 text-sm font-serif leading-relaxed mb-6">
                {selectedPromise.desc}
              </p>

              <button
                onClick={() => setSelectedPromise(null)}
                className="btn-romantic w-full py-2.5 text-xs uppercase font-mono tracking-wider"
              >
                <span>Claim Coupon ❤️</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
