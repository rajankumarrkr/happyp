import { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function VoiceMessage({ isVisible }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVoice = () => {
    sounds.playPop();
    if (!isPlaying) {
      sounds.playHarp();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      id="voice"
      className="section-container gradient-dark-rose relative py-16 md:py-28"
      aria-label="Voice Message"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-lg mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>🎙️ Personal Voice Message</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-4xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🎙️ “Meri Jaan, headphones laga lo…” 🎧
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-8 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Press play to hear a special birthday voice message just for you.
          </motion.p>

          {/* Audio Player Card */}
          <div className="w-full glass-strong rounded-3xl p-6 sm:p-8 border-2 border-pink/30 shadow-2xl flex flex-col items-center gap-6">
            {/* Visualizer Equalizer Bars */}
            <div className="flex items-center justify-center gap-1.5 h-12">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-burgundy via-rose to-champagne rounded-full"
                  animate={{
                    height: isPlaying ? [12, 36, 16, 44, 20][i % 5] : 8,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: 'mirror',
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>

            {/* Play Button */}
            <motion.button
              onClick={toggleVoice}
              className="w-20 h-20 rounded-full glass-rose border-2 border-rose flex items-center justify-center text-rose shadow-[0_0_30px_rgba(225,29,72,0.5)] cursor-pointer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </motion.button>

            {/* Voice Message Spoken Script Text Card */}
            <div className="text-center font-serif space-y-2 pt-2 border-t border-cream/10 w-full">
              <div className="flex items-center justify-center gap-2 text-gold-light text-xs font-mono uppercase tracking-widest mb-1">
                <Volume2 size={14} />
                <span>Recorded Voice Note</span>
              </div>
              <p className="text-cream/90 text-sm sm:text-base leading-relaxed italic">
                &ldquo;Happy Birthday Meri Jaan… main shayad words mein sab kuch explain nahi kar pata, but you really mean a lot to me… ❤️&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
