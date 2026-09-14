import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MemoryModal({
  memory,
  onClose,
  onNext,
  onPrev,
  currentIndex = 0,
  totalMemories = 0,
  imageError,
}) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    if (memory) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [memory, onClose, onNext, onPrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50 && onNext) {
      // Swiped left -> Next
      onNext();
    } else if (diff < -50 && onPrev) {
      // Swiped right -> Prev
      onPrev();
    }
  };

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-midnight/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Card */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[92dvh] flex flex-col glass-strong rounded-2xl sm:rounded-3xl overflow-hidden border border-pink/20 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar with Badge & Close Button */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 pointer-events-none">
              <span className="pointer-events-auto px-2.5 py-1 rounded-full glass-strong text-[11px] font-mono text-gold tracking-wider border border-gold/20 shadow-md">
                {currentIndex + 1} / {totalMemories}
              </span>

              <motion.button
                className="pointer-events-auto w-9 h-9 rounded-full glass-strong flex items-center justify-center text-cream/80 hover:text-white border border-pink/20 shadow-md"
                onClick={onClose}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Close memory"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Photo Container */}
            <div className="relative w-full bg-black/50 flex items-center justify-center min-h-[260px] max-h-[52vh] sm:max-h-[58vh] overflow-hidden">
              {imageError ? (
                <div className="memory-placeholder w-full aspect-[3/4] flex items-center justify-center">
                  <span className="text-5xl">📸</span>
                </div>
              ) : (
                <img
                  key={memory.id}
                  src={memory.image}
                  alt={memory.title}
                  className="w-auto max-w-full max-h-[52vh] sm:max-h-[58vh] object-contain mx-auto select-none"
                  loading="eager"
                />
              )}

              {/* Prev Button */}
              {onPrev && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-cream/90 hover:text-white border border-pink/20 shadow-lg z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                </motion.button>
              )}

              {/* Next Button */}
              {onNext && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-cream/90 hover:text-white border border-pink/20 shadow-lg z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next photo"
                >
                  <ChevronRight size={18} />
                </motion.button>
              )}
            </div>

            {/* Info & Caption Area */}
            <div className="p-4 sm:p-5 overflow-y-auto bg-dark-soft/60 flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gold-light/70 text-xs tracking-wider">
                  {memory.date}
                </p>
                <span className="text-[11px] text-cream/40 sm:hidden">
                  Swipe ← →
                </span>
              </div>

              <h3 className="heading-cinematic text-lg sm:text-xl text-cream mb-1.5">
                {memory.title}
              </h3>

              <p className="text-cream/80 text-elegant text-sm sm:text-base leading-relaxed">
                {memory.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
