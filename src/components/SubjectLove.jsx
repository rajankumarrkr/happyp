import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const subjects = [
  { icon: '🧬', name: 'Biology', phrase: 'Tum meri dhadkan ho' },
  { icon: '🌍', name: 'Physics', phrase: 'Tum meri gravity ho' },
  { icon: '🧪', name: 'Chemistry', phrase: 'Tum meri oxygen ho' },
  { icon: '➗', name: 'Maths', phrase: 'Tum mera solution ho' },
  { icon: '📖', name: 'English', phrase: 'Tum mera pyaar ho' },
  { icon: '📝', name: 'Hindi', phrase: 'Tum meri jaan ho' },
  { icon: '🌎', name: 'Geography', phrase: 'Tum meri poori duniya ho' },
  { icon: '🎨', name: 'Art', phrase: 'Tum sabse khoobsurat creation ho' },
  { icon: '🎵', name: 'Music', phrase: 'Tum meri favourite dhun ho' },
  { icon: '💻', name: 'Technology', phrase: 'Tum meri khushiyon ka password ho' },
  { icon: '❤️', name: 'Life', phrase: 'Tum mera sab kuch ho', isSpecial: true },
];

export default function SubjectLove({ isVisible }) {
  return (
    <section
      id="subjects"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Every Subject Equals You"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>🧪 Academic Proof of Love</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Every Subject = YOU ❤️
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-10 sm:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No matter what subject I study, every answer leads to you!
          </motion.p>

          {/* Grid of Subjects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {subjects.map((sub, i) => {
              return (
                <motion.div
                  key={i}
                  className={`glass-strong p-5 rounded-3xl border flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 ${
                    sub.isSpecial
                      ? 'col-span-1 sm:col-span-2 md:col-span-3 border-2 border-gold bg-gradient-to-r from-burgundy/50 via-rose/30 to-burgundy/50 shadow-[0_20px_60px_rgba(225,29,72,0.6)] py-8'
                      : 'border-pink/20 hover:border-gold/50 shadow-lg'
                  }`}
                  onClick={() => sounds.playChime(500 + i * 30, 0.15)}
                  whileHover={{ scale: 1.04, y: -4 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3) }}
                >
                  {/* Icon */}
                  <div
                    className={`mb-2 select-none ${
                      sub.isSpecial ? 'text-5xl animate-bounce' : 'text-3xl'
                    }`}
                  >
                    {sub.icon}
                  </div>

                  {/* Subject Name */}
                  <span className="text-xs font-mono text-gold-light uppercase tracking-widest block mb-1">
                    {sub.name}
                  </span>

                  {/* Phrase */}
                  <p
                    className={`${
                      sub.isSpecial
                        ? 'text-2xl sm:text-4xl text-handwritten text-gradient-rose font-bold glow-text mt-1'
                        : 'text-sm sm:text-base text-cream/90 font-serif leading-relaxed'
                    }`}
                  >
                    &ldquo;{sub.phrase}&rdquo;
                  </p>

                  {sub.isSpecial && (
                    <div className="mt-3 flex items-center gap-2 text-rose">
                      <Heart className="fill-rose animate-pulse" size={20} />
                      <span className="text-xs font-mono text-pink-soft uppercase tracking-widest">In_Life = Everything</span>
                      <Heart className="fill-rose animate-pulse" size={20} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
