import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, Send, CheckCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const chatSteps = [
  { sender: 'me', text: 'Meri Jaan, ek baat puchu?' },
  { sender: 'her', text: 'Haan bolo…' },
  { sender: 'me', text: 'Tum itni cute kaise ho?' },
  { sender: 'her', text: '🙄' },
  { sender: 'me', text: 'Dekha? Ye expression bhi cute hai. 😂❤️' },
];

export default function FakeChat({ isVisible }) {
  const [stepIndex, setStepIndex] = useState(-1);
  const [chatEnded, setChatEnded] = useState(false);

  const advanceChat = () => {
    if (stepIndex < chatSteps.length - 1) {
      sounds.playPop();
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      if (nextIdx === chatSteps.length - 1) {
        setTimeout(() => setChatEnded(true), 1200);
      }
    }
  };

  useEffect(() => {
    if (isVisible && stepIndex === -1) {
      const timer = setTimeout(() => {
        setStepIndex(0);
        sounds.playPop();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, stepIndex]);

  return (
    <section
      id="chat"
      className="section-container gradient-romantic relative py-16 md:py-28"
      aria-label="Fake Chat Experience"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose/10 blur-[130px]" />

      {isVisible && (
        <div className="relative z-10 w-full max-w-lg mx-auto text-center px-3 sm:px-4">
          {/* Header Tag */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass mb-4 text-xs text-pink-soft/90 border border-gold/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={13} className="text-gold" />
            <span>📱 Cute Chat Experience</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="heading-cinematic text-3xl sm:text-4xl text-gradient-rose mb-6 glow-text px-2 font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Secret Chat 💬
          </motion.h2>

          {/* WhatsApp / Instagram Chat Container */}
          <div className="w-full rounded-3xl glass-strong border-2 border-pink/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col text-left">
            {/* Chat Bar Header */}
            <div className="bg-dark-soft/90 px-4 py-3 border-b border-cream/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full glass-rose border border-rose flex items-center justify-center font-bold text-rose text-sm">
                  ❤️
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cream">Meri Jaan ❤️</h3>
                  <span className="text-[10px] text-rose-soft font-mono">online • typing...</span>
                </div>
              </div>
              <MessageCircle size={18} className="text-rose" />
            </div>

            {/* Chat Messages Body */}
            <div className="p-4 space-y-3 min-h-[260px] max-h-[360px] overflow-y-auto bg-dark/40 flex flex-col justify-end">
              <AnimatePresence>
                {chatSteps.slice(0, stepIndex + 1).map((msg, i) => {
                  const isMe = msg.sender === 'me';

                  return (
                    <motion.div
                      key={i}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-gradient-to-r from-burgundy to-rose text-white rounded-br-none shadow-md'
                            : 'glass-strong text-cream rounded-bl-none border border-pink/20'
                        }`}
                      >
                        <p className="font-serif">{msg.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-cream/50">
                          <span>Just now</span>
                          {isMe && <CheckCheck size={12} className="text-pink-soft" />}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Chat Input / Tap to Reply Bar */}
            <div className="p-3 bg-dark-soft/90 border-t border-cream/10 flex items-center justify-between gap-2">
              {stepIndex < chatSteps.length - 1 ? (
                <button
                  onClick={advanceChat}
                  className="w-full btn-romantic text-xs py-2.5 flex items-center justify-center gap-2"
                >
                  <span>Tap to send next message...</span>
                  <Send size={14} />
                </button>
              ) : (
                <div className="w-full text-center text-xs text-gold-light italic font-serif py-1">
                  Conversation ended because I couldn&apos;t stop falling for you. ❤️
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
