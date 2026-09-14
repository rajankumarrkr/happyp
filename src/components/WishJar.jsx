import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Star, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const secretNotes = [
  "You have the cutest laugh in the entire world. Never change it! 😊",
  "Even on my worst days, seeing a message from you fixes everything. ❤️",
  "You look effortlessly gorgeous in sarees, literally like a dream! 👑",
  "I am so proud of the kind, strong, and caring person you are. ✨",
  "Your happiness is genuinely my top priority. Always keep smiling! 🌸",
  "You make ordinary moments feel like special memories. 💖",
];

export default function WishJar({ isVisible }) {
  const [activeNote, setActiveNote] = useState(null);
  const [userWish, setUserWish] = useState('');
  const [flyingStars, setFlyingStars] = useState([]);

  const pickSecretNote = () => {
    sounds.playPop();
    sounds.playHarp();
    const randomNote = secretNotes[Math.floor(Math.random() * secretNotes.length)];
    setActiveNote(randomNote);
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;

    sounds.playFanfare();

    // Create flying star animation
    const newStar = {
      id: Date.now(),
      text: userWish,
      x: 50,
      y: 80,
    };
    setFlyingStars((prev) => [...prev, newStar]);
    setUserWish('');

    setTimeout(() => {
      setFlyingStars((prev) => prev.filter((s) => s.id !== newStar.id));
    }, 2500);
  };

  return (
    <section
      id="jar"
      className="section-container gradient-night-sky relative py-16 md:py-28"
      aria-label="Wish Jar and Secret Notes"
    >
      {/* Background Starry Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-champagne/5 blur-[140px]" />

      {/* Flying Star Animations */}
      <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
        {flyingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-gold-light font-serif shadow-2xl border border-gold"
            initial={{ left: '50%', bottom: '15%', opacity: 1, scale: 1 }}
            animate={{ left: '80%', bottom: '90%', opacity: 0, scale: 0.2 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          >
            <Star className="fill-gold text-gold" size={18} />
            <span className="text-xs">{star.text}</span>
          </motion.div>
        ))}
      </div>

      {isVisible && (
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-3 sm:px-4">
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-gold-light border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>Interactive Starlight Wish Box</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Jar of Secret Notes & Wishes 🏺✨
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-10 sm:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tap the jar to draw a secret note, or launch a wish into the stars!
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: 3D Jar Container */}
            <motion.div
              className="glass-strong p-6 sm:p-8 rounded-3xl flex flex-col items-center border border-gold/30 shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-36 h-48 sm:w-44 sm:h-56 relative rounded-t-3xl rounded-b-2xl border-4 border-gold/40 glass-gold shadow-[0_15px_40px_rgba(212,175,55,0.2)] flex flex-col justify-between p-3 cursor-pointer group" onClick={pickSecretNote}>
                {/* Wooden Cork Lid */}
                <div className="w-24 h-5 rounded-t-md bg-gradient-to-b from-amber-700 to-amber-900 mx-auto -mt-6 border border-amber-600 shadow-md" />

                {/* Glowing stars inside jar */}
                <div className="flex-1 flex flex-wrap items-center justify-center gap-2 p-2 relative overflow-hidden">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-lg select-none"
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{
                        duration: 2 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      {['⭐', '🌟', '✨', '💖'][i % 4]}
                    </motion.span>
                  ))}
                </div>

                <div className="text-center pt-1 border-t border-gold/20">
                  <span className="text-[10px] font-mono text-gold-light uppercase tracking-wider">Tap Jar</span>
                </div>
              </div>

              <motion.button
                onClick={pickSecretNote}
                className="btn-romantic mt-6 text-xs sm:text-sm py-2.5 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Draw a Secret Note 🏺</span>
              </motion.button>
            </motion.div>

            {/* Right: Make a Starlight Wish Box */}
            <div className="glass-strong p-6 sm:p-8 rounded-3xl border border-pink/20 shadow-2xl text-left">
              <div className="flex items-center gap-2 mb-3">
                <Star size={18} className="text-gold fill-gold" />
                <h3 className="heading-cinematic text-xl text-cream font-serif">Make a Starlight Wish</h3>
              </div>

              <p className="text-cream/70 text-xs sm:text-sm font-serif leading-relaxed mb-4">
                Type your birthday wish or message for this year. When you press launch, your wish will transform into a shooting star in the night sky! 🌌
              </p>

              <form onSubmit={handleSendWish} className="space-y-3">
                <textarea
                  value={userWish}
                  onChange={(e) => setUserWish(e.target.value)}
                  placeholder="Type your wish or thought here..."
                  rows={3}
                  className="w-full rounded-2xl glass p-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-rose border border-pink/20 resize-none font-serif"
                />

                <motion.button
                  type="submit"
                  disabled={!userWish.trim()}
                  className="btn-romantic w-full text-xs py-3 disabled:opacity-40"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={14} />
                  <span>Launch Wish to the Stars ✨</span>
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Secret Note Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveNote(null)} />
            <motion.div
              className="relative z-10 w-full max-w-sm glass-strong rounded-3xl p-6 text-center border-2 border-gold shadow-[0_20px_60px_rgba(212,175,55,0.4)]"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <button
                onClick={() => setActiveNote(null)}
                className="absolute top-3 right-3 text-cream/60 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="text-3xl mb-2">🏺✨</div>
              <span className="text-[10px] font-mono tracking-widest text-gold-light uppercase block mb-3">
                Unfolded Secret Note
              </span>

              <p className="text-cream/90 text-base font-serif leading-relaxed italic mb-6">
                &ldquo;{activeNote}&rdquo;
              </p>

              <button
                onClick={() => setActiveNote(null)}
                className="btn-ghost w-full text-xs"
              >
                <span>Close Note ✦</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
