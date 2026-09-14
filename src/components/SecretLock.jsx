import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, KeyRound } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function SecretLock({ onUnlock }) {
  const [inputName, setInputName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const validNames = ['pihu', 'merijaan', 'pooja', 'meri jaan', 'meri jaan ❤️'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = inputName.trim().toLowerCase();

    if (validNames.some((n) => normalized.includes(n))) {
      sounds.playFanfare();
      setIsUnlocked(true);
      setErrorMsg('');
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      sounds.playChime(300, 0.2);
      setErrorMsg("Hmm… I don't think you're Meri Jaan 😌");
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          className="fixed inset-0 z-[100] bg-midnight flex items-center justify-center p-4 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose/10 blur-[130px]" />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 text-center border-2 border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Lock Icon */}
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-gold mx-auto mb-4 flex items-center justify-center text-gold shadow-lg border border-gold/50 relative"
              animate={isUnlocked ? { scale: [1, 1.2, 1] } : { y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isUnlocked ? <Unlock size={36} /> : <Lock size={36} />}
              <div className="absolute -top-1 -right-1 text-rose text-xs animate-ping">❤️</div>
            </motion.div>

            <span className="text-[11px] font-mono tracking-widest text-gold-light uppercase block mb-1">
              Protected Birthday Surprise
            </span>

            <h2 className="heading-cinematic text-2xl sm:text-3xl text-gradient-rose mb-2 font-serif">
              🔒 Only You Can Open This
            </h2>

            <p className="text-cream/70 text-xs sm:text-sm font-serif mb-6 leading-relaxed">
              This website is reserved for one special person. Enter your secret nickname below to unlock...
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Enter your secret name (e.g. Pihu / Meri Jaan)..."
                  className="w-full rounded-2xl glass p-3.5 pl-10 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-gold border border-gold/30 font-serif"
                />
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
              </div>

              {errorMsg && (
                <motion.p
                  className="text-rose-soft text-xs italic font-serif"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMsg}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="btn-romantic w-full py-3 text-sm font-medium tracking-wide shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart size={16} className="fill-white/30" />
                <span>Unlock My Surprise ❤️</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
