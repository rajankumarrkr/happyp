import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function PersonalMessage({ isVisible }) {
  const [expanded, setExpanded] = useState(false);
  const { personalMessage } = birthdayData;

  const isEmotional = (text) => {
    return personalMessage.emotionalPhrases.some((phrase) => text.includes(phrase));
  };

  const renderText = (text) => {
    let result = text;
    personalMessage.emotionalPhrases.forEach((phrase) => {
      if (text.includes(phrase)) {
        result = text;
      }
    });
    return result;
  };

  const visibleParagraphs = expanded
    ? personalMessage.paragraphs
    : personalMessage.paragraphs.slice(0, 4);

  return (
    <section
      id="message"
      className="section-container gradient-romantic relative"
      aria-label="Personal Message"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose/5 blur-[100px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-xl mx-auto px-1 sm:px-4">
          {/* Heading */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl text-handwritten text-gradient-rose text-center mb-6 sm:mb-10 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {personalMessage.heading}
          </motion.h2>

          {/* Glassmorphism card */}
          <motion.div
            className="glass-rose p-4 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl border border-pink/15"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Decorative top */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-pink/30" />
                <span className="text-pink/50 text-sm">✦</span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-pink/30" />
              </div>
            </div>

            {/* Message content */}
            <div className="space-y-4">
              {visibleParagraphs.map((para, i) => {
                const emotional = isEmotional(para);
                return (
                  <motion.p
                    key={i}
                    className={`leading-relaxed ${
                      i === 0
                        ? 'text-lg text-handwritten text-gold-light'
                        : emotional
                        ? 'text-cream/90 text-elegant text-lg italic'
                        : 'text-cream/70 text-sm md:text-base'
                    } ${para === '❤️' ? 'text-center text-2xl mt-6' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  >
                    {emotional ? (
                      <>
                        {para.split(new RegExp(`(${personalMessage.emotionalPhrases.join('|')})`)).map(
                          (part, j) =>
                            personalMessage.emotionalPhrases.includes(part) ? (
                              <span key={j} className="text-handwritten text-pink text-lg md:text-xl">
                                {part}
                              </span>
                            ) : (
                              <span key={j}>{part}</span>
                            )
                        )}
                      </>
                    ) : (
                      renderText(para)
                    )}
                  </motion.p>
                );
              })}
            </div>

            {/* Read more/less */}
            {personalMessage.paragraphs.length > 4 && (
              <motion.button
                className="btn-ghost mt-8 mx-auto flex items-center gap-2"
                onClick={() => setExpanded(!expanded)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <span>{expanded ? 'Show Less' : 'Read More ❤️'}</span>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>
            )}

            {/* Decorative bottom */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-pink/30" />
                <span className="text-pink/50 text-sm">✦</span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-pink/30" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
