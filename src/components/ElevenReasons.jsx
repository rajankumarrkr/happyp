import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const elevenItems = [
  { id: 1, title: 'Tumhari Smile', response: 'Haye… 🥹❤️', emoji: '😊' },
  { id: 2, title: 'Tumhari Aankhein', response: 'Ufff… 👀✨', emoji: '👁️' },
  { id: 3, title: 'Tumhare Baal', response: 'MashaAllah 🌸', emoji: '💇‍♀️' },
  { id: 4, title: 'Tumhare Gaal', response: 'So Cute 🥹❤️', emoji: '😊' },
  { id: 5, title: 'Tumhare Honth', response: 'Ummm… 😚', emoji: '💋' },
  { id: 6, title: 'Tumhari Awaaz', response: 'Dil Le Gayi 🫶', emoji: '🎙️' },
  { id: 7, title: 'Tumhari Hasi', response: 'Jaan Le Jaati Hai 🥹', emoji: '💖' },
  { id: 8, title: 'Tumhari Care', response: 'Sabse Special ❤️', emoji: '🤗' },
  { id: 9, title: 'Tumhara Gussa', response: 'Bhi Pyaara Lagta Hai 🥺', emoji: '😡' },
  { id: 10, title: 'Tumhari Mohabbat', response: 'Meri Duniya 🌍❤️', emoji: '🌎' },
  { id: 11, title: 'Aur Tum', response: 'Meri Favourite Person, Forever 👑❤️', emoji: '👑', isClimax: true },
];

export default function ElevenReasons({ isVisible }) {
  return (
    <section
      id="eleven"
      className="section-container gradient-dark-rose relative py-16 md:py-28"
      aria-label="11 Things About You"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-rose/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>11 Precious Things About You 🫶</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tumhari 11 Cheezein Jo Mujhe… 🫶
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-10 sm:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Scroll down to reveal each one...
          </motion.p>

          {/* 11 Cards List */}
          <div className="space-y-4 sm:space-y-5">
            {elevenItems.map((item, i) => (
              <motion.div
                key={item.id}
                className={`glass-strong p-4 sm:p-5 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
                  item.isClimax
                    ? 'border-gold bg-gradient-to-r from-burgundy/40 via-rose/30 to-burgundy/40 shadow-[0_15px_40px_rgba(225,29,72,0.5)]'
                    : 'border-pink/20 hover:border-gold/40 shadow-lg'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="w-8 h-8 rounded-full glass-gold flex items-center justify-center text-xs font-mono text-gold font-bold">
                    #{String(item.id).padStart(2, '0')}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg font-serif text-cream/90 font-medium">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      item.isClimax
                        ? 'text-lg sm:text-2xl text-handwritten text-gradient-rose font-bold glow-text'
                        : 'text-sm sm:text-base text-gold-light font-serif font-semibold'
                    }`}
                  >
                    {item.response}
                  </span>
                  {item.isClimax && <Heart className="text-rose fill-rose" size={20} />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
