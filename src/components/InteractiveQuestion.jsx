import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import { sounds } from '../utils/soundEffects';

export default function InteractiveQuestion({ isVisible }) {
  const [stage, setStage] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const { question } = birthdayData;

  const handleAnswer = (ans) => {
    sounds.playPop();
    sounds.playHarp();
    setAnswer(ans);
    setStage(2);
  };

  const handleNoHover = () => {
    sounds.playChime(400, 0.15);
    setNoCount((prev) => prev + 1);
    // Random offset dodging
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 100;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <section
      id="question"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Interactive Question"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-burgundy/10 blur-[110px]" />

      {isVisible && (
        <div className="relative z-10 text-center max-w-lg mx-auto w-full px-4">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="setup"
                className="flex flex-col items-center gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-3xl sm:text-4xl md:text-5xl text-handwritten text-gradient-rose glow-text px-2 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {question.setup}
                </motion.p>

                <motion.button
                  className="btn-romantic animate-pulse-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    sounds.playChime();
                    setStage(1);
                  }}
                >
                  <span>What is it? 🤔</span>
                </motion.button>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="question"
                className="flex flex-col items-center gap-6 sm:gap-8"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-2xl sm:text-3xl md:text-4xl text-cream/90 text-elegant leading-relaxed px-2 font-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {question.main}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full max-w-xs sm:max-w-none justify-center relative min-h-[100px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {/* Yes Button */}
                  <motion.button
                    className="btn-romantic w-full sm:w-auto px-10 py-3.5 text-lg"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer('yes')}
                  >
                    <span>Yes, I do ❤️</span>
                  </motion.button>

                  {/* Dodging No Button */}
                  {noCount < 4 ? (
                    <motion.button
                      className="btn-ghost w-full sm:w-auto px-8 transition-transform duration-200"
                      style={{
                        transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                      }}
                      onMouseEnter={handleNoHover}
                      onClick={() => handleAnswer('no')}
                    >
                      <span>No 🥺</span>
                    </motion.button>
                  ) : (
                    /* Converts into Yes! after dodging 4 times */
                    <motion.button
                      className="btn-romantic w-full sm:w-auto px-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleAnswer('yes')}
                    >
                      <span>Actually Yes! 🥰</span>
                    </motion.button>
                  )}
                </motion.div>

                {noCount > 0 && noCount < 4 && (
                  <p className="text-pink/60 text-xs italic font-serif">
                    Hey! That button is escaping! 😉
                  </p>
                )}
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="response"
                className="flex flex-col items-center gap-5 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-6xl mb-2"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: 2 }}
                >
                  {answer === 'yes' ? '😊' : '🥰'}
                </motion.div>

                <motion.p
                  className="text-2xl sm:text-3xl md:text-4xl text-handwritten text-gradient-rose glow-text px-2 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {answer === 'yes' ? question.yesResponse : question.noResponse}
                </motion.p>

                <motion.div
                  className="flex items-center gap-2 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-cream/40 text-xs font-mono uppercase tracking-widest">Keep scrolling down</span>
                  <motion.span
                    className="text-pink/60"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
