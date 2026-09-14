import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  Pause,
  Sliders,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function MemoryModal({
  memory,
  allMemories = [],
  onClose,
  onNext,
  onPrev,
  onSelectMemory,
  currentIndex = 0,
  totalMemories = 0,
  imageError,
  isSlideshowActive = false,
  onToggleSlideshow,
  likedMemories = {},
  onToggleLike
}) {
  const [activeFilter, setActiveFilter] = useState('normal'); // normal | warm | sepia | bw | dream
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const thumbStripRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Filters definition
  const filters = [
    { id: 'normal', label: 'Original 🌸', class: 'filter-normal' },
    { id: 'warm', label: 'Warm Glow 🌅', class: 'filter-warm' },
    { id: 'sepia', label: 'Vintage 📜', class: 'filter-sepia' },
    { id: 'bw', label: 'Noir 🖤', class: 'filter-bw' },
    { id: 'dream', label: 'Dreamy ✨', class: 'filter-dream' },
  ];

  // Auto scroll current thumbnail into view
  useEffect(() => {
    if (thumbStripRef.current) {
      const activeThumb = thumbStripRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) {
        sounds.playChime(600, 0.15);
        onNext();
      }
      if (e.key === 'ArrowLeft' && onPrev) {
        sounds.playChime(500, 0.15);
        onPrev();
      }
      if (e.key === ' ') {
        e.preventDefault();
        onToggleSlideshow?.();
      }
    };

    if (memory) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [memory, onClose, onNext, onPrev, onToggleSlideshow]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50 && onNext) {
      sounds.playChime(600, 0.15);
      onNext();
    } else if (diff < -50 && onPrev) {
      sounds.playChime(500, 0.15);
      onPrev();
    }
  };

  const handleCopyCaption = () => {
    if (!memory) return;
    const textToCopy = `"${memory.title}" - ${memory.caption} ❤️`;
    navigator.clipboard.writeText(textToCopy);
    sounds.playChime(800, 0.2);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const activeFilterClass = filters.find((f) => f.id === activeFilter)?.class || 'filter-normal';
  const isLiked = memory ? likedMemories[memory.id] : false;

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop with ambient glow */}
          <motion.div
            className="absolute inset-0 bg-midnight/92 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[95dvh] flex flex-col glass-strong rounded-2xl sm:rounded-3xl overflow-hidden border border-pink/20 shadow-[0_0_50px_rgba(225,29,72,0.3)]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Slideshow Progress Bar */}
            {isSlideshowActive && (
              <div className="w-full h-1 bg-white/10 relative overflow-hidden z-30">
                <motion.div
                  key={memory.id}
                  className="h-full bg-gradient-to-r from-pink to-rose shadow-[0_0_10px_#e11d48]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                />
              </div>
            )}

            {/* Top Toolbar */}
            <div className="px-3 sm:px-5 py-3 flex items-center justify-between z-30 border-b border-white/10 bg-dark/60 backdrop-blur-md">
              {/* Index & Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full glass text-xs font-mono text-gold-light tracking-wider border border-gold/25 shadow-sm">
                  #{String(memory.id).padStart(2, '0')} / {totalMemories}
                </span>

                {isSlideshowActive && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose/20 text-rose text-[11px] border border-rose/30 animate-pulse">
                    <Sparkles size={11} /> Slideshow Playing
                  </span>
                )}
              </div>

              {/* Action Buttons Right */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Filter Picker Toggle */}
                <button
                  onClick={() => {
                    sounds.playChime(700, 0.15);
                    setShowFilterPicker(!showFilterPicker);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl glass text-xs flex items-center gap-1 transition-all ${
                    showFilterPicker || activeFilter !== 'normal'
                      ? 'bg-rose/20 text-rose-soft border-rose/40'
                      : 'text-cream/70 hover:text-white'
                  }`}
                  title="Photo Filters"
                >
                  <Sliders size={14} />
                  <span className="hidden sm:inline">Filter</span>
                </button>

                {/* Slideshow Play/Pause Button */}
                <button
                  onClick={() => {
                    sounds.playChime(650, 0.15);
                    onToggleSlideshow?.();
                  }}
                  className={`px-2.5 py-1.5 rounded-xl glass text-xs flex items-center gap-1.5 transition-all ${
                    isSlideshowActive
                      ? 'bg-rose text-white shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                      : 'text-cream/80 hover:text-white'
                  }`}
                  title={isSlideshowActive ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isSlideshowActive ? <Pause size={14} /> : <Play size={14} />}
                  <span className="hidden sm:inline">{isSlideshowActive ? 'Pause' : 'Play 🎞️'}</span>
                </button>

                {/* Close Button */}
                <motion.button
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-cream/80 hover:text-white border border-white/10"
                  onClick={onClose}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close memory"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Filter Picker Sub-bar */}
            <AnimatePresence>
              {showFilterPicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-black/40 border-b border-white/10 px-4 py-2 flex items-center justify-center gap-2 overflow-x-auto"
                >
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        sounds.playChime(750, 0.15);
                        setActiveFilter(f.id);
                      }}
                      className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                        activeFilter === f.id
                          ? 'bg-rose text-white shadow-md'
                          : 'glass text-cream/60 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Photo View area */}
            <div className="relative w-full bg-black/80 flex items-center justify-center min-h-[260px] sm:min-h-[340px] max-h-[50vh] sm:max-h-[55vh] overflow-hidden select-none">
              {imageError ? (
                <div className="memory-placeholder w-full aspect-[3/4] flex flex-col items-center justify-center text-cream/50">
                  <span className="text-6xl mb-2">📸</span>
                  <span className="text-sm font-mono">Photo #{memory.id}</span>
                </div>
              ) : (
                <motion.img
                  key={memory.id}
                  src={memory.image}
                  alt={memory.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-auto max-w-full max-h-[50vh] sm:max-h-[55vh] object-contain mx-auto transition-all ${activeFilterClass}`}
                  loading="eager"
                />
              )}

              {/* Prev Navigation Button */}
              {onPrev && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playChime(500, 0.15);
                    onPrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-white border border-white/20 shadow-xl z-20 hover:bg-rose/40"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </motion.button>
              )}

              {/* Next Navigation Button */}
              {onNext && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playChime(600, 0.15);
                    onNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-white border border-white/20 shadow-xl z-20 hover:bg-rose/40"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </motion.button>
              )}

              {/* Zoom & Like overlay controls */}
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="w-8 h-8 rounded-full glass-strong flex items-center justify-center text-white/80 hover:text-white border border-white/20"
                  title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                >
                  {isZoomed ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>

                <button
                  onClick={(e) => onToggleLike?.(e, memory.id)}
                  className="w-8 h-8 rounded-full glass-strong flex items-center justify-center text-rose hover:scale-110 transition-transform border border-white/20"
                  title="Favorite memory"
                >
                  <Heart size={15} className={isLiked ? 'fill-rose text-rose' : 'text-white/70'} />
                </button>
              </div>
            </div>

            {/* Photo Info & Handwritten Caption */}
            <div className="p-4 sm:p-5 bg-dark-soft/90 backdrop-blur-md flex-1 overflow-y-auto border-t border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gold-light/70 text-xs font-mono tracking-wider">
                  📅 {memory.date}
                </span>

                <button
                  onClick={handleCopyCaption}
                  className="inline-flex items-center gap-1 text-[11px] text-cream/60 hover:text-gold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy Quote
                    </>
                  )}
                </button>
              </div>

              <h3 className="heading-cinematic text-xl sm:text-2xl text-gradient-rose mb-1.5">
                {memory.title}
              </h3>

              <p className="text-cream/90 text-elegant text-base sm:text-lg leading-relaxed">
                "{memory.caption}"
              </p>
            </div>

            {/* Scrollable Bottom Thumbnail Bar */}
            {allMemories.length > 0 && (
              <div className="bg-black/90 p-2 border-t border-white/10">
                <div
                  ref={thumbStripRef}
                  className="flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {allMemories.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        sounds.playChime(600, 0.1);
                        onSelectMemory?.(idx);
                      }}
                      className={`relative flex-shrink-0 w-12 h-14 rounded-md overflow-hidden transition-all border ${
                        idx === currentIndex
                          ? 'border-rose scale-105 shadow-[0_0_10px_#e11d48] ring-2 ring-rose/50'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono text-center text-gold-light py-0.5">
                        #{m.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
