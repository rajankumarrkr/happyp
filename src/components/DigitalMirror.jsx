import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sparkle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function DigitalMirror({ isVisible }) {
  const [revealed, setRevealed] = useState(false);
  const samplePhoto = birthdayData.memories[0]?.image || '/memories/memory1.jpg';

  const handleMirrorClick = () => {
    sounds.playPop();
    sounds.playHarp();
    setRevealed(true);
  };

  return (
    <section
      id="mirror"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Digital Mirror"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-champagne/10 blur-[140px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-gold-light border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>🪞 Digital Reflection</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            “Aaj ek baar khud ko meri aankhon se dekho…” 🪞❤️
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-8 sm:mb-12 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tap the mirror reflection below...
          </motion.p>

          {/* Mirror Frame */}
          <div className="relative mx-auto w-64 sm:w-80 aspect-[3/4] mb-8">
            <motion.div
              className="w-full h-full rounded-[40px] p-4 glass-gold border-4 border-gold/60 shadow-[0_25px_60px_rgba(212,175,55,0.4)] relative overflow-hidden flex flex-col items-center justify-center cursor-pointer group"
              onClick={handleMirrorClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Gold Ornament Top Pin */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gold text-lg select-none">
                ✦ 👑 ✦
              </div>

              {!revealed ? (
                <div className="flex flex-col items-center gap-3 text-center my-auto p-4 z-20">
                  <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center text-gold text-2xl animate-pulse border border-gold">
                    🪞
                  </div>
                  <span className="text-sm font-serif text-gold-light">
                    Tap to look into the mirror...
                  </span>
                </div>
              ) : (
                <motion.div
                  className="w-full h-full rounded-[30px] overflow-hidden relative shadow-inner"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={samplePhoto}
                    alt="Reflection"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="text-xs font-serif text-gold-light drop-shadow">
                      Ab samjhi main tumhe itna kyun dekhta hoon? ❤️
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Shimmer line across mirror */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
            </motion.div>
          </div>

          {/* Chand Shayari Card */}
          {revealed && (
            <motion.div
              className="glass-strong p-6 sm:p-8 rounded-3xl border-2 border-gold/40 shadow-2xl text-center space-y-3 max-w-xl mx-auto font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Sparkle className="text-gold mx-auto" size={20} />
              <p className="text-cream/90 text-base sm:text-lg leading-relaxed">
                Tum khoobsurat jaise chaand lagti ho…<br />
                Tum nadaan, but pyaari behisaab lagti ho…
              </p>
              <p className="text-cream/90 text-base sm:text-lg leading-relaxed">
                Ab ye kaanch ka tukda kya batayega tumhe…<br />
                Tumhari khoobsurati ka…
              </p>
              <p className="text-gradient-rose text-lg sm:text-2xl font-bold font-serif glow-text pt-2">
                Zara meri aankhon se poochho, kitni lajawab lagti ho… ❤️
              </p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
