import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Shayari({ isVisible }) {
  const { shayariList } = birthdayData;

  return (
    <section
      id="shayari"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Romantic Shayari"
    >
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/15 blur-[140px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-3 sm:px-6">
          {/* Top Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>Dil Se Likhi Kuch Baatein 🌸</span>
          </motion.div>

          {/* Main Section Header */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-8 sm:mb-12 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Romantic Verses For Meri Jaan 💕
          </motion.h2>

          {/* Render All Shayari Cards */}
          <div className="space-y-12 sm:space-y-16">
            {shayariList.map((poem, poemIdx) => (
              <motion.div
                key={poem.id}
                className="space-y-4"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: poemIdx * 0.3 }}
              >
                {/* Poem Title & Subtitle */}
                <div className="mb-4">
                  <h3 className="heading-cinematic text-2xl sm:text-3xl text-gold-light glow-text font-serif">
                    {poem.title}
                  </h3>
                  {poem.subtitle && (
                    <p className="text-cream/60 text-elegant text-sm sm:text-base italic mt-1">
                      &ldquo;{poem.subtitle}&rdquo;
                    </p>
                  )}
                </div>

                {/* Stanzas Cards Container */}
                <div className="space-y-5 sm:space-y-6">
                  {poem.stanzas.map((stanza, i) => (
                    <motion.div
                      key={i}
                      className="glass-strong p-6 sm:p-8 rounded-3xl border border-pink/20 shadow-2xl relative overflow-hidden text-center group"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Gold leaf corner accents */}
                      <div className="absolute top-3 left-3 text-gold/40 text-sm select-none">✦</div>
                      <div className="absolute top-3 right-3 text-gold/40 text-sm select-none">✦</div>
                      <div className="absolute bottom-3 left-3 text-gold/40 text-sm select-none">✦</div>
                      <div className="absolute bottom-3 right-3 text-gold/40 text-sm select-none">✦</div>

                      {/* Stanza Lines */}
                      <div className="space-y-2 relative z-10 font-serif">
                        {stanza.map((line, lineIdx) => {
                          if (line === '') return <div key={lineIdx} className="h-2" />;
                          const isQuestion = line.startsWith('“') || line.startsWith('"');
                          const isAnswer = line.includes('smile dekh lena') || line.includes('lajawab lagti ho');

                          return (
                            <p
                              key={lineIdx}
                              className={`${
                                isAnswer
                                  ? 'text-lg sm:text-2xl text-handwritten text-gradient-rose font-bold glow-text mt-2'
                                  : isQuestion
                                  ? 'text-base sm:text-xl text-gold-light italic font-medium'
                                  : 'text-base sm:text-lg text-cream/90 leading-relaxed font-serif'
                              }`}
                            >
                              {line}
                            </p>
                          );
                        })}
                      </div>

                      {/* Bottom subtle heart badge */}
                      <div className="mt-4 flex items-center justify-center gap-2 text-rose/40">
                        <span className="w-8 h-[1px] bg-rose/20" />
                        <Heart size={12} className="fill-rose/30" />
                        <span className="w-8 h-[1px] bg-rose/20" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
