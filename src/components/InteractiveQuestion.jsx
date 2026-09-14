import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function InteractiveQuestion({ isVisible }) {
  const [stage, setStage] = useState(0);
  // 0 = setup, 1 = question, 2 = response
  const [answer, setAnswer] = useState(null);
  const { question } = birthdayData;

  const handleAnswer = (ans) => {
    setAnswer(ans);
    setStage(2);
  };

  return (
    <section
      id="question"
      className="section-container gradient-romantic relative"
      aria-label="Interactive Question"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-burgundy/5 blur-[80px]" />

      {isVisible && (
        <div className="relative z-10 text-center max-w-lg mx-auto w-full px-4">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="setup"
                className="flex flex-col items-center gap-5 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-2xl sm:text-3xl md:text-4xl text-handwritten text-gradient-rose glow-text px-2 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {question.setup}
                </motion.p>

                <motion.button
                  className="btn-ghost mt-4 px-6 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStage(1)}
                >
                  <span>What is it? 🤔</span>
                </motion.button>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="question"
                className="flex flex-col items-center gap-6 sm:gap-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-cream/90 text-elegant leading-relaxed px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {question.main}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full max-w-xs sm:max-w-none justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    className="btn-romantic w-full sm:w-auto px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer('yes')}
                  >
                    <span>Yes ❤️</span>
                  </motion.button>

                  <motion.button
                    className="btn-ghost w-full sm:w-auto px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer('no')}
                  >
                    <span>No 🥺</span>
                  </motion.button>
                </motion.div>
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
                  className="text-5xl mb-2 sm:mb-4"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: 2 }}
                >
                  {answer === 'yes' ? '😊' : '🥰'}
                </motion.div>

                <motion.p
                  className="text-xl sm:text-2xl md:text-3xl text-handwritten text-gradient-rose glow-text px-2 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {answer === 'yes' ? question.yesResponse : question.noResponse}
                </motion.p>

                <motion.div
                  className="flex items-center gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="text-cream/30 text-xs tracking-wider">scroll down</span>
                  <motion.span
                    className="text-pink/40"
                    animate={{ y: [0, 5, 0] }}
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
