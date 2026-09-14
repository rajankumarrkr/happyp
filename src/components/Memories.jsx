import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Smartphone, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import MemoryModal from './MemoryModal';

export default function Memories({ isVisible }) {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const carouselRef = useRef(null);

  const { memories } = birthdayData;

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const selectedMemory = selectedMemoryIndex !== null ? memories[selectedMemoryIndex] : null;

  const handleNextMemory = () => {
    if (selectedMemoryIndex !== null && selectedMemoryIndex < memories.length - 1) {
      setSelectedMemoryIndex(selectedMemoryIndex + 1);
    } else if (selectedMemoryIndex === memories.length - 1) {
      setSelectedMemoryIndex(0); // loop back
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
      const scrollAmount = direction === 'next' ? 300 : -300;
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
        <div className="relative z-10 w-full max-w-6xl mx-auto px-1 sm:px-4">
          {/* Header Area */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass mb-3 text-xs text-pink-soft/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles size={12} className="text-gold" />
              <span>35 Precious Moments Frozen in Time</span>
            </motion.div>

            <motion.h2
              className="heading-cinematic text-2xl sm:text-4xl md:text-5xl text-gradient-rose glow-text mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Little Moments, Big Memories ❤️
            </motion.h2>

            <motion.p
              className="text-cream/50 text-elegant text-sm sm:text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Every smile of yours is my favorite story
            </motion.p>

            {/* Mobile View Toggle */}
            <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-rose text-white shadow-[0_0_12px_rgba(190,18,60,0.5)]'
                    : 'glass text-cream/60'
                }`}
              >
                <LayoutGrid size={13} />
                <span>2-Col Grid</span>
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-rose text-white shadow-[0_0_12px_rgba(190,18,60,0.5)]'
                    : 'glass text-cream/60'
                }`}
              >
                <Smartphone size={13} />
                <span>Story Swipe</span>
              </button>
            </div>
          </div>

          {/* Grid View (Default on desktop, and active on mobile when in grid mode) */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {memories.map((memory, i) => (
                <motion.div
                  key={memory.id}
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Math.min((i % 4) * 0.08, 0.25) }}
                >
                  <motion.button
                    className="w-full text-left group relative block rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-dark-soft/40 border border-pink/10 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedMemoryIndex(i)}
                    aria-label={`View memory: ${memory.title}`}
                  >
                    {/* Image Container with 3/4 Portrait Ratio */}
                    <div className="aspect-[3/4] relative overflow-hidden rounded-xl sm:rounded-2xl bg-midnight/60">
                      {imageErrors[memory.id] ? (
                        <div className="memory-placeholder w-full h-full flex items-center justify-center">
                          <span className="text-3xl">📸</span>
                        </div>
                      ) : (
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={() => handleImageError(memory.id)}
                        />
                      )}

                      {/* Number badge */}
                      <div className="absolute top-2 left-2 z-10 px-1.5 sm:px-2 py-0.5 rounded-md glass text-[10px] font-mono text-gold-light/90">
                        #{String(memory.id).padStart(2, '0')}
                      </div>

                      {/* Top right sparkle */}
                      <div className="absolute top-2 right-2 text-pink/40 group-hover:text-pink text-xs transition-colors">
                        ✦
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 z-10">
                        <p className="text-gold-light/70 text-[10px] sm:text-xs tracking-wider mb-0.5 truncate">
                          {memory.date}
                        </p>
                        <h3 className="text-cream text-xs sm:text-sm md:text-base font-medium heading-cinematic mb-0.5 truncate">
                          {memory.title}
                        </h3>
                        <p className="text-cream/55 text-[10px] sm:text-xs text-elegant line-clamp-1 sm:line-clamp-2">
                          {memory.caption}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Carousel View for Mobile */
            <div className="relative">
              {/* Left/Right floating arrows for mobile carousel */}
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
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {memories.map((memory, i) => (
                  <div
                    key={memory.id}
                    className="flex-shrink-0 w-[260px] snap-center"
                  >
                    <motion.button
                      className="w-full text-left group relative block rounded-2xl overflow-hidden cursor-pointer border border-pink/15"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMemoryIndex(i)}
                    >
                      <div className="aspect-[3/4] relative overflow-hidden rounded-2xl bg-midnight/60">
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

                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded glass text-[10px] font-mono text-gold-light">
                          #{String(memory.id).padStart(2, '0')} / 35
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-3.5">
                          <p className="text-gold-light/70 text-xs mb-0.5">{memory.date}</p>
                          <h3 className="text-cream text-base font-medium heading-cinematic mb-1">
                            {memory.title}
                          </h3>
                          <p className="text-cream/60 text-xs text-elegant line-clamp-2">
                            {memory.caption}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>

              <p className="text-center text-cream/30 text-xs mt-2">
                ← Swipe to browse all 35 memories →
              </p>
            </div>
          )}

          {/* Hint */}
          <p className="text-center text-cream/30 text-xs mt-6">
            Tap any memory to view full photo & notes ❤️
          </p>
        </div>
      )}

      {/* Memory Modal with navigation */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemoryIndex(null)}
        onNext={handleNextMemory}
        onPrev={handlePrevMemory}
        currentIndex={selectedMemoryIndex || 0}
        totalMemories={memories.length}
        imageError={selectedMemory ? imageErrors[selectedMemory.id] : false}
      />
    </section>
  );
}
