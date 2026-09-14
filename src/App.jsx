import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import FloatingEffects from './components/FloatingEffects';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import Intro from './components/Intro';
import BirthdayReveal from './components/BirthdayReveal';
import PersonalMessage from './components/PersonalMessage';
import LoveLetter from './components/LoveLetter';
import Memories from './components/Memories';
import Reasons from './components/Reasons';
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
  'letter',
  'memories',
  'reasons',
  'question',
  'gifts',
  'stars',
  'timeline',
  'cake',
  'final',
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('intro');
  const [visibleSections, setVisibleSections] = useState(new Set(['intro']));
  const observerRef = useRef(null);

  // Intersection Observer — re-runs when `started` changes so new DOM elements get observed
  useEffect(() => {
    if (loading) return;

    // Disconnect any previous observer
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

    // Use requestAnimationFrame to let newly-mounted sections render in the DOM first
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
  }, [loading, started]);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setStarted(true);
    // Mark birthday section as visible immediately and scroll to it
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
    <div className="relative">
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Floating effects */}
      {!loading && <FloatingEffects />}

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
      {!loading && (
        <main>
          {/* Intro (always visible initially) */}
          <Intro onComplete={handleIntroComplete} />

          {/* Remaining sections — always mounted so IntersectionObserver can find them,
              but visually hidden until started */}
          <div style={{ display: started ? 'block' : 'none' }}>
            <BirthdayReveal isVisible={isSectionVisible('birthday')} />
            <PersonalMessage isVisible={isSectionVisible('message')} />
            <LoveLetter isVisible={isSectionVisible('letter')} />
            <Memories isVisible={isSectionVisible('memories')} />
            <Reasons isVisible={isSectionVisible('reasons')} />
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
