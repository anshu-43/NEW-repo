
import React, { useState, useEffect } from 'react';
import { Section } from './types';
import Home from './components/Home.tsx';
import Quiz from './components/Quiz.tsx';
import MemoryGame from './components/MemoryGame.tsx';
import ScienceQuiz from './components/ScienceQuiz.tsx';
import ConfessionRoom from './components/ConfessionRoom.tsx';
import MemoryVault from './components/MemoryVault.tsx';
import SongLibrary from './components/SongLibrary.tsx';
import ResetDialog from './components/ResetDialog.tsx';
import { audioService } from './services/audioService';
import { storageService } from './services/storageService';

const SECTION_SEQUENCE: Section[] = ['home', 'game', 'science', 'quiz', 'confession'];

const App: React.FC = () => {
  // Always start at 'home' for a fresh entry experience every time
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [unlockedSections, setUnlockedSections] = useState<Set<Section>>(new Set(['home']));
  const [tanviPreferences, setTanviPreferences] = useState({
    color: 'Purple',
    insect: 'Butterfly',
    cartoon: 'Doraemon & Shinchan',
    destination: 'Korea'
  });
  
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [showVault, setShowVault] = useState(false);
  const [showReset, setShowReset] = useState(false);

  // Restore progress on mount, but override activeSection to 'home'
  useEffect(() => {
    const saved = storageService.loadAppState();
    if (saved) {
      setUnlockedSections(new Set(saved.unlockedSections as Section[]));
      setTanviPreferences(saved.preferences);
      // activeSection stays 'home'
    }
  }, []);

  // Save progress whenever state changes
  useEffect(() => {
    storageService.saveAppState({
      activeSection,
      unlockedSections: Array.from(unlockedSections),
      preferences: tanviPreferences
    });
  }, [activeSection, unlockedSections, tanviPreferences]);

  const unlock = (section: Section) => {
    audioService.playSuccess();
    setUnlockedSections(prev => new Set([...prev, section]));
    setActiveSection(section);
    
    if (!isMusicOn) {
      const newState = audioService.toggleBGM(true);
      setIsMusicOn(newState);
    }
  };

  const handleNavClick = (section: Section) => {
    if (unlockedSections.has(section)) {
      audioService.playClick();
      setActiveSection(section);
    }
  };

  const handleResetRange = (start: Section, end: Section) => {
    const startIdx = SECTION_SEQUENCE.indexOf(start);
    const endIdx = SECTION_SEQUENCE.indexOf(end);
    
    const realStart = Math.min(startIdx, endIdx);
    const realEnd = Math.max(startIdx, endIdx);
    
    const sectionsToLock = SECTION_SEQUENCE.slice(realStart, realEnd + 1);
    
    setUnlockedSections(prev => {
      const next = new Set(prev);
      sectionsToLock.forEach(s => {
        if (s !== 'home') next.delete(s);
      });
      return next;
    });

    // Reset current view to Home if it was part of the reset range
    if (sectionsToLock.includes(activeSection)) {
      setActiveSection('home');
    }

    setShowReset(false);
    audioService.playPop();
  };

  return (
    <div className="min-h-screen purple-gradient text-white flex flex-col selection:bg-pink-500/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/5 px-6 md:px-12">
        <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-1 no-scrollbar max-w-[65%]">
          {(['home', 'game', 'science', 'quiz', 'confession'] as Section[]).map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className={`px-4 py-2 rounded-full text-base md:text-lg font-cursive transition-all duration-300 whitespace-nowrap ${
                activeSection === section 
                  ? 'bg-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105' 
                  : unlockedSections.has(section) 
                    ? 'bg-white/10 text-purple-100 hover:bg-white/20' 
                    : 'bg-gray-800/40 opacity-20 cursor-not-allowed'
              }`}
            >
              {section === 'science' ? 'Theory' : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 md:space-x-5">
          <button 
            onClick={() => { audioService.playClick(); setShowReset(true); }}
            className="p-2 text-white/30 hover:text-pink-400 transition-colors"
            title="Reset Journey"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setShowVault(true); }}
            className="p-2 text-white/40 hover:text-white transition-colors"
            title="Memory Vault"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
          
          <button 
            onClick={() => setIsMusicOn(audioService.toggleBGM())}
            className={`p-2 transition-colors ${isMusicOn ? 'text-pink-400' : 'text-white/20'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </button>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-12 px-4 max-w-4xl mx-auto w-full flex flex-col items-center">
        {activeSection === 'home' && (
          <Home onStart={() => unlock('game')} />
        )}
        {activeSection === 'game' && (
          <MemoryGame onComplete={() => unlock('science')} />
        )}
        {activeSection === 'science' && (
          <ScienceQuiz onComplete={() => unlock('quiz')} />
        )}
        {activeSection === 'quiz' && (
          <Quiz 
            onComplete={(prefs) => {
              setTanviPreferences(prefs);
              unlock('confession');
            }} 
          />
        )}
        {activeSection === 'confession' && (
          <ConfessionRoom preferences={tanviPreferences} />
        )}
      </main>

      {showVault && <MemoryVault onClose={() => setShowVault(false)} />}
      {showReset && (
        <ResetDialog 
          unlockedSections={unlockedSections} 
          onClose={() => setShowReset(false)} 
          onReset={handleResetRange} 
        />
      )}
      
      <footer className="p-8 text-center text-purple-300/20 text-[8px] uppercase tracking-[0.6em] font-black pointer-events-none">
        TANVI • 17 YEARS OF MAGIC • 2009-2026
      </footer>

      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default App;
