import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function Timeline({ isVisible }) {
  const { timeline } = birthdayData;

  return (
    <section
      id="timeline"
      className="section-container gradient-romantic relative py-16 md:py-24"
      aria-label="Our Timeline"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-burgundy/5 blur-[100px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-2xl mx-auto px-3 sm:px-6">
          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-2xl sm:text-4xl md:text-5xl text-gradient-rose text-center mb-3 sm:mb-4 glow-text px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Little Story
          </motion.h2>

          <motion.p
            className="text-cream/50 text-center text-elegant text-sm sm:text-lg mb-10 sm:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Every chapter matters ❤️
          </motion.p>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-[1px]"
              style={{ transformOrigin: 'top', background: 'linear-gradient(180deg, transparent, var(--color-rose), var(--color-pink), transparent)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />

            {/* Timeline items */}
            <div className="space-y-8 sm:space-y-12">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0;

                return (
                  <motion.div
                    key={i}
                    className={`relative flex items-start gap-4 sm:gap-6 ${
                      // Mobile: always left-aligned with compact indent, Desktop: alternating
                      'pl-10 sm:pl-14 md:pl-0'
                    } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  >
                    {/* Dot */}
                    <motion.div
                      className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose border-2 border-midnight z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                    >
                      <div className="absolute inset-0 rounded-full bg-rose animate-ping opacity-20" />
                    </motion.div>

                    {/* Card */}
                    <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className={`glass p-3.5 sm:p-5 w-full md:w-auto inline-block border border-pink/10 shadow-md ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                        <span className="text-rose/50 text-[11px] font-mono tracking-wider">
                          Chapter {item.chapter}
                        </span>
                        <h3 className="heading-cinematic text-base sm:text-xl text-cream mt-0.5 mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-cream/70 text-xs sm:text-sm text-elegant leading-relaxed max-w-none md:max-w-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
