import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shuffle,
  Heart,
  Search,
  RotateCw,
  Play,
  Film,
  BookOpen,
  X
} from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import MemoryModal from './MemoryModal';
import { sounds } from '../utils/soundEffects';

export default function Memories({ isVisible }) {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel' | 'compact'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMemories, setLikedMemories] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  const carouselRef = useRef(null);
  const slideshowTimerRef = useRef(null);

  const { memories } = birthdayData;

  // Categories definition
  const categories = [
    { id: 'all', label: 'All (35)' },
    { id: 'favorites', label: 'Favorites ❤️' },
    { id: 'ethnic', label: 'Desi & Saree 👑' },
    { id: 'cute', label: 'Cute Vibes 😊' },
    { id: 'liked', label: 'Liked Only 💖' },
  ];

  // Filter & Search Logic
  const filteredMemories = useMemo(() => {
    let result = memories;

    // Category filter
    if (activeCategory === 'favorites') {
      result = result.filter((m) => [1, 6, 8, 11, 16, 21, 28, 35].includes(m.id));
    } else if (activeCategory === 'ethnic') {
      result = result.filter((m) => [6, 8, 16, 18, 25].includes(m.id));
    } else if (activeCategory === 'cute') {
      result = result.filter((m) => [9, 10, 13, 19, 29, 32].includes(m.id));
    } else if (activeCategory === 'liked') {
      result = result.filter((m) => likedMemories[m.id]);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.caption.toLowerCase().includes(q) ||
          m.date.toLowerCase().includes(q) ||
          String(m.id).includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery, memories, likedMemories]);

  // Slideshow auto-advance timer
  useEffect(() => {
    if (isSlideshowActive && selectedMemoryIndex !== null) {
      slideshowTimerRef.current = setInterval(() => {
        sounds.playChime(650, 0.15);
        setSelectedMemoryIndex((prevIndex) => {
          if (prevIndex === null || prevIndex >= memories.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });
      }, 4000);
    } else {
      clearInterval(slideshowTimerRef.current);
    }

    return () => clearInterval(slideshowTimerRef.current);
  }, [isSlideshowActive, selectedMemoryIndex, memories.length]);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const toggleLike = (e, id) => {
    e.stopPropagation();
    sounds.playChime(700, 0.2);
    setLikedMemories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCardFlip = (e, id) => {
    e.stopPropagation();
    sounds.playChime(450, 0.2);
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRandomMemory = () => {
    sounds.playHarp();
    const randomIndex = Math.floor(Math.random() * memories.length);
    setSelectedMemoryIndex(randomIndex);
  };

  const handleStartSlideshow = () => {
    sounds.playHarp();
    setSelectedMemoryIndex(0);
    setIsSlideshowActive(true);
  };

  const selectedMemory = selectedMemoryIndex !== null ? memories[selectedMemoryIndex] : null;

  const handleNextMemory = () => {
    if (selectedMemoryIndex !== null && selectedMemoryIndex < memories.length - 1) {
      setSelectedMemoryIndex(selectedMemoryIndex + 1);
    } else if (selectedMemoryIndex === memories.length - 1) {
      setSelectedMemoryIndex(0);
    }
  };

  const handlePrevMemory = () => {
    if (selectedMemoryIndex !== null && selectedMemoryIndex > 0) {
      setSelectedMemoryIndex(selectedMemoryIndex - 1);
    } else if (selectedMemoryIndex === 0) {
      setSelectedMemoryIndex(memories.length - 1);
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'next' ? 320 : -320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="memories"
      className="section-container gradient-romantic relative py-12 md:py-24"
      aria-label="Our Memories"
    >
      {isVisible && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6">
          {/* Header Area */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft border border-gold/30 shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles size={14} className="text-gold animate-twinkle" />
              <span>35 Precious Moments Frozen in Time</span>
            </motion.div>

            <motion.h2
              className="heading-cinematic text-3xl sm:text-5xl md:text-6xl text-gradient-rose glow-text mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Little Moments, Big Memories ❤️
            </motion.h2>

            <motion.p
              className="text-cream/70 text-elegant text-lg sm:text-xl mb-6 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Every smile of yours is my favorite story... Click any photo to enlarge or flip to read the diary note 📖
            </motion.p>

            {/* Search Input Bar */}
            <div className="relative max-w-md mx-auto mb-6">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-3.5 text-cream/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search memories, captions, dates..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-full glass text-sm text-cream placeholder:text-cream/40 border border-pink/20 focus:outline-none focus:border-rose/50 focus:ring-2 focus:ring-rose/20 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-cream/50 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Action Bar: Slideshow & Random */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                onClick={handleStartSlideshow}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose to-burgundy text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] transition-all border border-pink/30"
              >
                <Film size={14} />
                <span>Play Slideshow 🎞️</span>
              </button>

              <button
                onClick={handleRandomMemory}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-xs text-gold-light font-semibold hover:bg-gold/20 transition-all border border-gold/40 shadow-sm"
              >
                <Shuffle size={14} />
                <span>Surprise Me 🎲</span>
              </button>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 glass p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    viewMode === 'grid' ? 'bg-rose text-white shadow-sm' : 'text-cream/60 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid size={13} />
                </button>
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    viewMode === 'carousel' ? 'bg-rose text-white shadow-sm' : 'text-cream/60 hover:text-white'
                  }`}
                  title="Carousel swipe view"
                >
                  <Smartphone size={13} />
                </button>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.playChime(500, 0.15);
                    setActiveCategory(cat.id);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-rose text-white shadow-[0_0_15px_rgba(225,29,72,0.6)] border border-pink/30'
                      : 'glass text-cream/70 hover:text-white hover:bg-cream/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count / Filter indicator */}
          {searchQuery && (
            <p className="text-center text-xs text-cream/50 mb-4 font-mono">
              Found {filteredMemories.length} memory matching "{searchQuery}"
            </p>
          )}

          {/* Empty search state */}
          {filteredMemories.length === 0 && (
            <div className="text-center py-16 glass rounded-3xl max-w-md mx-auto border border-white/10">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-cream/70 text-sm">No memories found for this filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 text-xs text-rose-soft underline hover:text-white"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Grid View with 3D Flip Polaroid Cards */}
          {viewMode === 'grid' ? (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              <AnimatePresence>
                {filteredMemories.map((memory) => {
                  const originalIndex = memories.findIndex((m) => m.id === memory.id);
                  const isFlipped = flippedCards[memory.id];
                  const isLiked = likedMemories[memory.id];

                  return (
                    <motion.div
                      key={memory.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      className="w-full perspective-1000 min-h-[340px]"
                    >
                      <div
                        className={`relative w-full h-full transform-style-3d polaroid-card group cursor-pointer ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* Washi Tape Accent */}
                        <div className="polaroid-tape" />

                        {/* ─── FRONT SIDE OF POLAROID ─── */}
                        <div
                          className="backface-hidden w-full h-full flex flex-col justify-between"
                          onClick={() => {
                            sounds.playChime(550, 0.2);
                            setSelectedMemoryIndex(originalIndex);
                          }}
                        >
                          {/* Image Container (Ratio 3/4) */}
                          <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-stone-900 shadow-inner">
                            {imageErrors[memory.id] ? (
                              <div className="memory-placeholder w-full h-full flex flex-col items-center justify-center bg-stone-800 text-stone-400">
                                <span className="text-3xl mb-1">📸</span>
                                <span className="text-[10px] font-mono">Photo #{memory.id}</span>
                              </div>
                            ) : (
                              <img
                                src={memory.image}
                                alt={memory.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                                loading="lazy"
                                onError={() => handleImageError(memory.id)}
                              />
                            )}

                            {/* Memory Badge */}
                            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-gold-light border border-white/10">
                              #{String(memory.id).padStart(2, '0')}
                            </div>

                            {/* Action Buttons Top Right: Like & Flip Note */}
                            <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                              {/* Flip Note Button */}
                              <button
                                onClick={(e) => toggleCardFlip(e, memory.id)}
                                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-cream/90 hover:text-white hover:bg-rose/80 transition-colors"
                                title="Flip to read Diary Note 📖"
                              >
                                <BookOpen size={13} />
                              </button>

                              {/* Heart Toggle */}
                              <button
                                onClick={(e) => toggleLike(e, memory.id)}
                                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-rose hover:scale-110 transition-transform"
                                aria-label="Like memory"
                              >
                                <Heart
                                  size={13}
                                  className={isLiked ? 'fill-rose text-rose' : 'text-white/70'}
                                />
                              </button>
                            </div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Date overlay */}
                            <div className="absolute bottom-2 left-2 right-2 text-white">
                              <p className="text-[10px] text-gold-light font-mono truncate">{memory.date}</p>
                            </div>
                          </div>

                          {/* Polaroid Caption Area */}
                          <div className="mt-2.5 text-stone-800 text-left px-0.5 flex items-center justify-between">
                            <div className="overflow-hidden pr-1">
                              <h3 className="text-sm font-bold text-stone-900 truncate font-serif">
                                {memory.title}
                              </h3>
                              <p className="text-[11px] text-stone-600 line-clamp-1">
                                {memory.caption}
                              </p>
                            </div>

                            <button
                              onClick={(e) => toggleCardFlip(e, memory.id)}
                              className="text-[10px] text-rose font-medium underline flex-shrink-0 flex items-center gap-0.5 hover:text-burgundy"
                            >
                              Flip <RotateCw size={10} />
                            </button>
                          </div>
                        </div>

                        {/* ─── BACK SIDE OF POLAROID (Diary Note) ─── */}
                        <div
                          className="absolute inset-0 backface-hidden rotate-y-180 parchment-bg rounded-xl p-4 flex flex-col justify-between border-2 border-stone-300 text-stone-900 shadow-xl overflow-hidden"
                          onClick={(e) => toggleCardFlip(e, memory.id)}
                        >
                          {/* Inner Diary Stamp / Header */}
                          <div>
                            <div className="flex items-center justify-between border-b border-stone-400/40 pb-2 mb-3">
                              <span className="font-mono text-[10px] text-stone-600 tracking-wider">
                                DIARY ENTRY #{memory.id}
                              </span>
                              <span className="text-xs">📜</span>
                            </div>

                            <p className="font-mono text-[11px] text-stone-500 mb-2">{memory.date}</p>

                            <h4 className="text-base font-bold text-burgundy font-serif mb-2">
                              "{memory.title}"
                            </h4>

                            <p className="text-xs text-stone-800 leading-relaxed font-serif italic">
                              "{memory.caption}"
                            </p>
                          </div>

                          <div className="border-t border-stone-400/40 pt-2 flex items-center justify-between">
                            <span className="text-[11px] text-rose font-semibold">
                              Meri Jaan ❤️
                            </span>
                            <button
                              className="text-[10px] text-stone-600 font-mono underline flex items-center gap-1"
                            >
                              Photo <RotateCw size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Carousel View for Mobile / Swipe */
            <div className="relative">
              <div className="hidden sm:flex justify-between absolute -top-12 right-0 gap-2">
                <button
                  onClick={() => scrollCarousel('prev')}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-cream/70 hover:text-white"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollCarousel('next')}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-cream/70 hover:text-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {filteredMemories.map((memory) => {
                  const originalIndex = memories.findIndex((m) => m.id === memory.id);
                  const isLiked = likedMemories[memory.id];
                  return (
                    <div key={memory.id} className="flex-shrink-0 w-[280px] snap-center">
                      <div
                        className="polaroid-card group relative cursor-pointer"
                        onClick={() => setSelectedMemoryIndex(originalIndex)}
                      >
                        <div className="polaroid-tape" />
                        <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-stone-900">
                          {imageErrors[memory.id] ? (
                            <div className="memory-placeholder w-full h-full flex items-center justify-center">
                              <span>📸</span>
                            </div>
                          ) : (
                            <img
                              src={memory.image}
                              alt={memory.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={() => handleImageError(memory.id)}
                            />
                          )}
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-gold-light">
                            #{String(memory.id).padStart(2, '0')} / 35
                          </div>

                          <button
                            onClick={(e) => toggleLike(e, memory.id)}
                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-rose"
                          >
                            <Heart size={14} className={isLiked ? 'fill-rose text-rose' : 'text-white'} />
                          </button>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <p className="text-xs text-gold-light font-mono">{memory.date}</p>
                          </div>
                        </div>
                        <div className="mt-2.5 text-stone-800 text-left">
                          <h3 className="text-sm font-bold text-stone-900 truncate font-serif">
                            {memory.title}
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-2">{memory.caption}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hint */}
          <p className="text-center text-cream/40 text-xs mt-8 font-mono">
            Tap any photo to view in Fullscreen Lightbox • Flip card for handwritten diary note 📖
          </p>
        </div>
      )}

      {/* Memory Lightbox Modal */}
      <MemoryModal
        memory={selectedMemory}
        allMemories={memories}
        onClose={() => {
          setSelectedMemoryIndex(null);
          setIsSlideshowActive(false);
        }}
        onNext={handleNextMemory}
        onPrev={handlePrevMemory}
        onSelectMemory={(idx) => setSelectedMemoryIndex(idx)}
        currentIndex={selectedMemoryIndex || 0}
        totalMemories={memories.length}
        imageError={selectedMemory ? imageErrors[selectedMemory.id] : false}
        isSlideshowActive={isSlideshowActive}
        onToggleSlideshow={() => setIsSlideshowActive(!isSlideshowActive)}
        likedMemories={likedMemories}
        onToggleLike={toggleLike}
      />
    </section>
  );
}
