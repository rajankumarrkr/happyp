import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Activity } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function HeartbeatSection({ isVisible }) {
  const [bpm, setBpm] = useState(72);
  const [tapped, setTapped] = useState(false);

  const handleHeartTap = () => {
    sounds.playPop();
    if (bpm < 100) {
      const nextBpm = bpm === 72 ? 86 : 100;
      setBpm(nextBpm);
      sounds.playChime(450 + (nextBpm - 72) * 5, 0.2);
      if (nextBpm === 100) {
        setTapped(true);
      }
    } else {
      setBpm(72);
      setTapped(false);
    }
  };

  const animationSpeed = (60 / bpm).toFixed(2);

  return (
    <section
      id="heartbeat"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Heartbeat Rate"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/15 blur-[140px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-lg mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>🫀 Live Pulse Ticker</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-4xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Guess what this heart is trying to say… 🫀❤️
          </motion.h2>

          {/* Glowing Pulse Card */}
          <div className="w-full glass-strong rounded-3xl p-6 sm:p-8 border-2 border-pink/30 shadow-2xl flex flex-col items-center gap-6 mt-6">
            {/* Heartbeat Ticker Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-rose border border-rose text-pink font-mono text-sm font-bold shadow-lg">
              <Activity size={18} className="animate-pulse" />
              <span>❤️ {bpm} BPM</span>
            </div>

            {/* Glowing Pulsing Heart Button */}
            <motion.button
              onClick={handleHeartTap}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-rose border-4 border-rose flex items-center justify-center text-rose cursor-pointer relative shadow-[0_0_40px_rgba(225,29,72,0.6)]"
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: Number(animationSpeed), repeat: Infinity, ease: 'easeInOut' }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="fill-rose" size={56} />
              <div className="absolute inset-0 rounded-full border border-pink/40 animate-ping opacity-40 pointer-events-none" />
            </motion.button>

            {/* Subtext Reveal */}
            <div className="text-center font-serif min-h-[60px] flex items-center justify-center">
              {tapped ? (
                <motion.p
                  className="text-xl sm:text-2xl text-handwritten text-gradient-rose font-bold glow-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  “Maybe it just heard your name. ❤️”
                </motion.p>
              ) : (
                <p className="text-cream/70 text-sm font-serif italic">
                  Tap the pulsing heart to measure pulse speed...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
