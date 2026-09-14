import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Trophy } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const gameMessages = [
  "One reason I smile. ❤️",
  "Two reasons my day gets better! ✨",
  "Three reasons you are my favorite! 🌸",
  "Four reasons my heart beats faster! 💓",
  "Five reasons I adore you endlessly! 👑",
];

export default function MiniGame({ isVisible }) {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentHeartPos, setCurrentHeartPos] = useState({ x: 50, y: 50 });

  const moveHeart = useCallback(() => {
    const randomX = 15 + Math.random() * 70;
    const randomY = 20 + Math.random() * 60;
    setCurrentHeartPos({ x: randomX, y: randomY });
  }, []);

  const catchHeart = () => {
    sounds.playPop();
    sounds.playChime(600 + score * 100, 0.2);

    const newScore = score + 1;
    setScore(newScore);

    if (newScore >= 5) {
      sounds.playFanfare();
      setGameCompleted(true);
    } else {
      moveHeart();
    }
  };

  const startGame = () => {
    sounds.playPop();
    setScore(0);
    setGameCompleted(false);
    setGameStarted(true);
    moveHeart();
  };

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(moveHeart, 1600);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted, moveHeart]);

  return (
    <section
      id="game"
      className="section-container gradient-night-sky relative py-16 md:py-28"
      aria-label="Catch 5 Hearts Game"
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
            <span>🎮 Interactive Mini Love Game</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            “Meri Jaan, ek chhota sa game kheloge?” 🎮❤️
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Goal: Catch 5 floating hearts on screen!
          </motion.p>

          {/* Game Playing Area Box */}
          <div className="w-full h-80 sm:h-96 rounded-3xl glass-strong border-2 border-gold/30 relative overflow-hidden shadow-2xl flex flex-col justify-between p-4">
            {/* Top Score Bar */}
            <div className="flex items-center justify-between border-b border-cream/15 pb-2 z-20">
              <span className="text-xs font-mono text-gold-light uppercase tracking-wider">
                Hearts Caught: {score} / 5
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart
                    key={i}
                    size={16}
                    className={i < score ? 'text-rose fill-rose' : 'text-cream/20'}
                  />
                ))}
              </div>
            </div>

            {/* Game States */}
            {!gameStarted && (
              <div className="my-auto flex flex-col items-center gap-4 z-20">
                <div className="w-16 h-16 rounded-full glass-rose flex items-center justify-center text-rose animate-bounce">
                  <Heart className="fill-rose text-rose" size={32} />
                </div>

                <p className="text-cream/80 text-sm font-serif max-w-xs leading-relaxed">
                  Hearts will float around the screen. Tap them before they move away!
                </p>

                <motion.button
                  onClick={startGame}
                  className="btn-romantic text-sm py-3 px-8 shadow-xl"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Game 🎮❤️</span>
                </motion.button>
              </div>
            )}

            {gameStarted && !gameCompleted && (
              <div className="relative inset-0 flex-1 z-20">
                {/* Floating Target Heart */}
                <motion.button
                  onClick={catchHeart}
                  className="absolute p-3 rounded-full glass-rose border border-rose text-rose cursor-pointer shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                  style={{
                    left: `${currentHeartPos.x}%`,
                    top: `${currentHeartPos.y}%`,
                  }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Heart className="fill-rose" size={28} />
                </motion.button>

                {/* Score Message Toast */}
                {score > 0 && (
                  <motion.div
                    key={score}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-gold text-gold-light text-xs font-serif shadow-lg border border-gold/40"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {gameMessages[score - 1]}
                  </motion.div>
                )}
              </div>
            )}

            {gameCompleted && (
              <motion.div
                className="my-auto flex flex-col items-center gap-4 z-20 p-4 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center text-gold border border-gold shadow-lg">
                  <Trophy size={32} />
                </div>

                <span className="text-xs font-mono text-gold-light uppercase tracking-widest">
                  Game Victory! 🎉
                </span>

                <p className="text-xl sm:text-2xl font-serif text-cream leading-relaxed max-w-md">
                  &ldquo;You collected 5 hearts… but unfortunately, you can&apos;t collect mine. <span className="text-gradient-rose font-bold">It&apos;s already yours. ❤️</span>&rdquo;
                </p>

                <motion.button
                  onClick={startGame}
                  className="btn-ghost text-xs mt-2"
                  whileHover={{ scale: 1.04 }}
                >
                  <span>Play Again 🎮</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
