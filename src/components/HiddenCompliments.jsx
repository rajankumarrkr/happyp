import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, EyeOff, Heart, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const compliments = [
  { id: 1, text: "Tum jab bina reason smile karti ho na, tab pata nahi kyun mera mood automatically achha ho jata hai. ❤️" },
  { id: 2, text: "Tumhari aankhon mein dekh kar lagta hai jaise duniya ki saari pareshaaniyan gayab ho gayi hon. 🥺" },
  { id: 3, text: "Tumhari awaaz sunke dil ko alag hi sukoon milta hai. ✨" },
  { id: 4, text: "Jab tum thoda sa bhi care karti ho na, toh lagta hai main sabse lucky insaan hoon. 🌸" },
  { id: 5, text: "Tumhara thoda sa gussa hona bhi itna cute hota hai ki main gussa reh hi nahi pata. 😊" },
  { id: 6, text: "Tumhare baare mein sochte sochte pata nahi kab smile aa jaati hai. 💕" },
  { id: 7, text: "Basically, you are the best thing that ever happened to me. 👑❤️" },
];

export default function HiddenCompliments({ isVisible }) {
  const [openedCards, setOpenedCards] = useState({});
  const [activeModal, setActiveModal] = useState(null);

  const openCard = (id, text) => {
    sounds.playPop();
    sounds.playHarp();
    setOpenedCards((prev) => ({ ...prev, [id]: true }));
    setActiveModal({ id, text });
  };

  return (
    <section
      id="compliments"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Hidden Compliments"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>💎 7 Sealed Secret Cards</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-5xl text-gradient-rose mb-3 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            “Tumhe pata hai?” — Hidden Compliments 💎
          </motion.h2>

          <motion.p
            className="text-cream/60 text-elegant text-base sm:text-xl mb-10 sm:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sealed notes straight from my heart... tap to unseal!
          </motion.p>

          {/* Grid of 7 Sealed Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {compliments.map((comp) => {
              const isOpen = openedCards[comp.id];

              return (
                <motion.div
                  key={comp.id}
                  className={`glass-strong p-5 rounded-3xl border flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-300 cursor-pointer min-h-[160px] ${
                    isOpen ? 'border-gold bg-gradient-to-b from-rose/20 to-burgundy/30 shadow-lg' : 'border-pink/20 hover:border-gold/50'
                  }`}
                  onClick={() => openCard(comp.id, comp.text)}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: comp.id * 0.1 }}
                >
                  {/* Top Seal Stamp */}
                  <div className="w-10 h-10 rounded-full glass-gold flex items-center justify-center text-gold mb-2 border border-gold/40">
                    {isOpen ? <Heart className="fill-rose text-rose" size={20} /> : <EyeOff size={20} />}
                  </div>

                  <span className="text-[10px] font-mono text-gold-light uppercase tracking-wider block mb-1">
                    Card #{comp.id}
                  </span>

                  <p className="text-cream/90 text-xs sm:text-sm font-serif leading-relaxed line-clamp-3">
                    {isOpen ? comp.text : "“Meri Jaan, isse mat kholna… 🫣”"}
                  </p>

                  <div className="mt-3">
                    <span className="text-[10px] text-pink-soft/70 font-mono underline uppercase tracking-widest">
                      {isOpen ? 'Read Note ✨' : 'Click to Unseal 💌'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Popup */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveModal(null)} />
            <motion.div
              className="relative z-10 w-full max-w-sm glass-strong rounded-3xl p-6 text-center border-2 border-gold shadow-[0_20px_60px_rgba(225,29,72,0.5)]"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 right-3 text-cream/60 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-full glass-rose mx-auto mb-3 flex items-center justify-center text-pink border border-rose">
                <Heart className="fill-rose text-rose" size={24} />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-gold-light uppercase block mb-2">
                Hidden Compliment #{activeModal.id}
              </span>

              <p className="text-cream/90 text-base font-serif leading-relaxed italic mb-6">
                &ldquo;{activeModal.text}&rdquo;
              </p>

              <button
                onClick={() => setActiveModal(null)}
                className="btn-romantic w-full py-2.5 text-xs uppercase font-mono tracking-wider"
              >
                <span>Keep In My Heart ❤️</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
