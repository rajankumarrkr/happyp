import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import SecretLock from './components/SecretLock';
import FloatingEffects from './components/FloatingEffects';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import Intro from './components/Intro';
import BirthdayReveal from './components/BirthdayReveal';
import PersonalMessage from './components/PersonalMessage';
import HiddenCompliments from './components/HiddenCompliments';
import Shayari from './components/Shayari';
import LoveLetter from './components/LoveLetter';
import Memories from './components/Memories';
import ElevenReasons from './components/ElevenReasons';
import SubjectLove from './components/SubjectLove';
import PromiseWheel from './components/PromiseWheel';
import WishJar from './components/WishJar';
import Reasons from './components/Reasons';
import MiniGame from './components/MiniGame';
import FakeChat from './components/FakeChat';
import DigitalMirror from './components/DigitalMirror';
import VoiceMessage from './components/VoiceMessage';
import HeartbeatSection from './components/HeartbeatSection';
import OneWishCountdown from './components/OneWishCountdown';
import InteractiveQuestion from './components/InteractiveQuestion';
import MysteryGifts from './components/MysteryGifts';
import StarWish from './components/StarWish';
import Timeline from './components/Timeline';
import BirthdayCake from './components/BirthdayCake';
import FinalSurprise from './components/FinalSurprise';

const sectionIds = [
  'intro',
  'birthday',
  'message',
  'compliments',
  'shayari',
  'letter',
  'memories',
  'eleven',
  'subjects',
  'promises',
  'jar',
  'reasons',
  'game',
  'chat',
  'mirror',
  'voice',
  'heartbeat',
  'onewish',
  'question',
  'gifts',
  'stars',
  'timeline',
  'cake',
  'final',
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [siteUnlocked, setSiteUnlocked] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('intro');
  const [visibleSections, setVisibleSections] = useState(new Set(['intro']));
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef(null);

  // Scroll progress for top bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (loading || !siteUnlocked) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setCurrentSection(id);
            setVisibleSections((prev) => {
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    requestAnimationFrame(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, started, siteUnlocked]);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleSecretUnlocked = useCallback(() => {
    setSiteUnlocked(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setStarted(true);
    setVisibleSections((prev) => {
      const next = new Set(prev);
      next.add('birthday');
      return next;
    });
    setTimeout(() => {
      document.getElementById('birthday')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  const handleNavigate = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const isSectionVisible = useCallback(
    (id) => visibleSections.has(id),
    [visibleSections]
  );

  return (
    <div className="relative min-h-screen bg-midnight text-cream select-none sm:select-auto">
      {/* Top Rose-Gold Story Progress Bar */}
      {started && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-burgundy via-rose to-champagne transition-all duration-150 ease-out shadow-[0_0_10px_rgba(225,29,72,0.8)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Secret Name Lock Screen */}
      {!loading && !siteUnlocked && (
        <SecretLock onUnlock={handleSecretUnlocked} />
      )}

      {/* Floating effects */}
      {!loading && siteUnlocked && <FloatingEffects />}

      {/* Music player */}
      {started && <MusicPlayer />}

      {/* Navigation */}
      {started && (
        <Navigation
          currentSection={currentSection}
          onNavigate={handleNavigate}
          visible={!['intro', 'final'].includes(currentSection)}
        />
      )}

      {/* Main content */}
      {!loading && siteUnlocked && (
        <main>
          <Intro onComplete={handleIntroComplete} />

          <div style={{ display: started ? 'block' : 'none' }}>
            <BirthdayReveal isVisible={isSectionVisible('birthday')} />
            <PersonalMessage isVisible={isSectionVisible('message')} />
            <HiddenCompliments isVisible={isSectionVisible('compliments')} />
            <Shayari isVisible={isSectionVisible('shayari')} />
            <LoveLetter isVisible={isSectionVisible('letter')} />
            <Memories isVisible={isSectionVisible('memories')} />
            <ElevenReasons isVisible={isSectionVisible('eleven')} />
            <SubjectLove isVisible={isSectionVisible('subjects')} />
            <PromiseWheel isVisible={isSectionVisible('promises')} />
            <WishJar isVisible={isSectionVisible('jar')} />
            <Reasons isVisible={isSectionVisible('reasons')} />
            <MiniGame isVisible={isSectionVisible('game')} />
            <FakeChat isVisible={isSectionVisible('chat')} />
            <DigitalMirror isVisible={isSectionVisible('mirror')} />
            <VoiceMessage isVisible={isSectionVisible('voice')} />
            <HeartbeatSection isVisible={isSectionVisible('heartbeat')} />
            <OneWishCountdown isVisible={isSectionVisible('onewish')} />
            <InteractiveQuestion isVisible={isSectionVisible('question')} />
            <MysteryGifts isVisible={isSectionVisible('gifts')} />
            <StarWish isVisible={isSectionVisible('stars')} />
            <Timeline isVisible={isSectionVisible('timeline')} />
            <BirthdayCake isVisible={isSectionVisible('cake')} />
            <FinalSurprise isVisible={isSectionVisible('final')} />
          </div>
        </main>
      )}
    </div>
  );
}
