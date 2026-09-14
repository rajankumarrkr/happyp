import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Compass, X } from 'lucide-react';

const sections = [
  { id: 'intro', label: '01', title: 'Intro' },
  { id: 'birthday', label: '02', title: 'Birthday Wish' },
  { id: 'message', label: '03', title: 'Message' },
  { id: 'letter', label: '04', title: 'Love Letter' },
  { id: 'memories', label: '05', title: '35 Memories' },
  { id: 'reasons', label: '06', title: 'Why Special' },
  { id: 'question', label: '07', title: 'Question' },
  { id: 'gifts', label: '08', title: 'Surprises' },
  { id: 'stars', label: '09', title: 'Star Wish' },
  { id: 'timeline', label: '10', title: 'Our Story' },
  { id: 'cake', label: '11', title: 'Birthday Cake' },
  { id: 'final', label: '12', title: 'Forever' },
];

export default function Navigation({ currentSection, onNavigate, visible }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!visible) return null;

  const currentIndex = sections.findIndex((s) => s.id === currentSection);
  const currentItem = sections[currentIndex] || sections[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(sections[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      onNavigate(sections[currentIndex + 1].id);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Right Side Dots */}
      <motion.nav
        className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        aria-label="Section navigation desktop"
      >
        {sections.map((section, index) => {
          const isActive = currentSection === section.id;
          const isPast = currentIndex > index;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="group relative flex items-center justify-end gap-2 p-1"
              aria-label={`Go to section ${section.title}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Tooltip */}
              <span className="absolute right-7 whitespace-nowrap text-xs text-pink-soft/0 group-hover:text-pink-soft/90 transition-all duration-300 translate-x-2 group-hover:translate-x-0 font-medium">
                {section.title}
              </span>

              {/* Dot */}
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-rose scale-125 shadow-[0_0_12px_rgba(190,18,60,0.8)]'
                    : isPast
                    ? 'bg-pink/60'
                    : 'bg-cream/20 group-hover:bg-cream/50'
                }`}
                whileHover={{ scale: 1.5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile Navigation - Floating Pill (Bottom Right, Safe from thumb scroll) */}
      <div className="md:hidden fixed bottom-4 right-3 z-40" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <motion.div
          className="glass-strong flex items-center gap-1.5 px-2.5 py-1.5 shadow-lg border border-pink/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Section Indicator button to open drawer */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-1.5 text-xs text-cream/80 hover:text-cream px-1.5 py-1"
            aria-label="Open chapter menu"
          >
            <Compass size={13} className="text-rose" />
            <span className="font-mono text-gold text-[11px]">{currentItem.label}</span>
            <span className="text-[11px] font-medium max-w-[75px] truncate">{currentItem.title}</span>
          </button>

          <div className="w-[1px] h-3.5 bg-cream/15" />

          {/* Up arrow */}
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="p-1 text-cream/60 hover:text-cream disabled:opacity-20 active:scale-90 transition-all"
            aria-label="Previous section"
          >
            <ChevronUp size={14} />
          </button>

          {/* Down arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= sections.length - 1}
            className="p-1 text-cream/60 hover:text-cream disabled:opacity-20 active:scale-90 transition-all"
            aria-label="Next section"
          >
            <ChevronDown size={14} />
          </button>
        </motion.div>
      </div>

      {/* Mobile Chapter Picker Bottom Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[70] flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="relative z-10 glass-strong border-t border-pink/25 rounded-t-3xl p-5 max-h-[75vh] flex flex-col"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cream/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-rose text-sm">✦</span>
                  <h3 className="heading-cinematic text-sm font-medium text-cream">Pooja&apos;s Special Chapters</h3>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full glass flex items-center justify-center text-cream/60 hover:text-cream"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Section list */}
              <div className="overflow-y-auto space-y-1.5 py-1">
                {sections.map((sec, idx) => {
                  const isActive = currentSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        onNavigate(sec.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-rose/25 border border-rose/40 text-cream font-medium'
                          : 'hover:bg-cream/5 text-cream/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs ${isActive ? 'text-gold' : 'text-cream/40'}`}>
                          {sec.label}
                        </span>
                        <span className="text-xs text-left">{sec.title}</span>
                      </div>
                      {isActive && <span className="text-xs text-pink">❤️</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
