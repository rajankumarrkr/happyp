import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(birthdayData.musicPath);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Check if music file exists
    audio.addEventListener('error', () => {
      setIsAvailable(false);
    });

    // Hide label after 5 seconds
    const labelTimer = setTimeout(() => setShowLabel(false), 5000);

    return () => {
      audio.pause();
      audio.src = '';
      clearTimeout(labelTimer);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !isAvailable) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay, that's okay
      });
    }
    setIsPlaying(!isPlaying);
  };

  if (!isAvailable) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-3 md:bottom-6 md:left-6 z-40 flex items-center gap-2 sm:gap-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <motion.button
        onClick={togglePlay}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-pink hover:text-rose transition-colors duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        style={{
          boxShadow: isPlaying
            ? '0 0 20px rgba(190, 18, 60, 0.4)'
            : '0 0 10px rgba(0, 0, 0, 0.4)',
        }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Pause size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Music size={18} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playing indicator */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-rose/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Label */}
      <AnimatePresence>
        {showLabel && !isPlaying && (
          <motion.span
            className="text-xs text-pink-soft/60 whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            Play our song 🎵
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
