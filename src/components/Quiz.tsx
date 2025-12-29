
import React, { useState, useEffect, useRef } from 'react';
import { audioService } from '../services/audioService';
import { TANVI_QUIZ_DATA } from '../constants';
import { Confetti } from './Confetti';
import { storageService } from '../services/storageService';

interface QuizProps {
  onComplete: (prefs: any) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState<'thinking' | 'scanning' | 'guess' | 'ask' | 'correct'>('thinking');
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [inputVal, setInputVal] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [genieMessage, setGenieMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [userPrefs, setUserPrefs] = useState<any>({});

  const timerRef = useRef<number | null>(null);
  const current = TANVI_QUIZ_DATA[step];
  const [allChoices, setAllChoices] = useState<string[]>([]);

  useEffect(() => {
    const choices = Array.from(new Set([...current.options, current.guess])).sort(() => Math.random() - 0.5);
    setAllChoices(choices);
    setSubStep('thinking');
    setHighlightIdx(-1);
    setAttempts(0);
    setGenieMessage('');
    
    const t = window.setTimeout(() => setSubStep('scanning'), 1500);
    return () => window.clearTimeout(t);
  }, [step, current]);

  const runScanning = () => {
    let count = 0;
    const totalSteps = 24;
    
    const runStep = () => {
      setHighlightIdx(prev => {
        let next = Math.floor(Math.random() * allChoices.length);
        if (allChoices.length > 1 && next === prev) next = (next + 1) % allChoices.length;
        return next;
      });
      
      audioService.playClick();
      count++;

      if (count < totalSteps) {
        timerRef.current = window.setTimeout(runStep, 40 + (count * 4));
      } else {
        timerRef.current = window.setTimeout(() => {
          let finalGuess = current.guess;
          let message = "Behold! The ultimate truth revealed!";
          
          if (attempts === 0) {
             const wrongs = current.options.filter(o => o !== current.guess);
             finalGuess = wrongs[Math.floor(Math.random() * wrongs.length)];
             message = "I'm trying my best to find the gem for you...";
          } else if (attempts === 1) {
             const wrongs = current.options.filter(o => o !== current.guess);
             finalGuess = wrongs[Math.floor(Math.random() * wrongs.length)];
             message = "Wait, let me look closer... This time I'll surely guess it!";
          } else if (attempts >= 2) {
             finalGuess = current.guess;
             message = "The stars have aligned! This is it, isn't it?";
          }
          
          setCurrentGuess(finalGuess);
          setGenieMessage(message);
          setSubStep('guess');
          audioService.playMagic();
        }, 600);
      }
    };
    runStep();
  };

  useEffect(() => {
    if (subStep === 'scanning' && allChoices.length > 0) runScanning();
  }, [subStep, allChoices]);

  const handleYes = () => {
    audioService.playSuccess();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    const val = currentGuess;
    storageService.saveMemory('preference', current.label, val);
    setUserPrefs(p => ({ ...p, [current.id]: val }));
    setSubStep('correct');
    proceed();
  };

  const handleNo = () => {
    audioService.playPop();
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 4) {
      setSubStep('ask');
    } else {
      setSubStep('scanning');
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    audioService.playSuccess();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    storageService.saveMemory('preference', current.label, inputVal);
    setUserPrefs(p => ({ ...p, [current.id]: inputVal }));
    setSubStep('correct');
    proceed();
  };

  const proceed = () => {
    window.setTimeout(() => {
      if (step < TANVI_QUIZ_DATA.length - 1) {
        setStep(step + 1);
        setInputVal('');
      } else {
        onComplete(userPrefs);
      }
    }, 3500);
  };

  return (
    <div className="w-full max-w-2xl px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
      <Confetti active={showConfetti} />
      <div className="bg-purple-900/30 backdrop-blur-3xl p-8 md:p-14 rounded-[3.5rem] border border-white/10 text-center shadow-2xl w-full relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <div className="h-full bg-pink-500 transition-all duration-1000" style={{ width: `${((step + 1)/TANVI_QUIZ_DATA.length)*100}%` }}></div>
        </div>

        <div className="animate-fade-in py-10">
          {subStep === 'thinking' && (
            <div className="space-y-6">
              <div className="text-5xl animate-bounce">🧞‍♂️</div>
              <p className="text-base font-cursive text-purple-300">Summoning the Genie...</p>
            </div>
          )}

          {subStep === 'scanning' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allChoices.map((c, i) => (
                <div key={i} className={`p-4 rounded-2xl border transition-all duration-100 ${highlightIdx === i ? 'bg-pink-500 border-pink-400 text-white scale-105 shadow-lg brightness-110' : 'bg-white/5 border-white/5 opacity-10'}`}>
                  <span className="text-xl font-cursive truncate block">{c}</span>
                </div>
              ))}
            </div>
          )}

          {subStep === 'guess' && (
            <div className="space-y-8 animate-scale-up">
              <div className="space-y-2">
                <p className="text-pink-300 font-cursive text-lg animate-pulse">{genieMessage}</p>
                <h2 className="text-xl italic text-purple-200">"Your {current.label} is definitely..."</h2>
              </div>
              <div className="text-6xl md:text-7xl font-cursive text-white drop-shadow-lg">{currentGuess}</div>
              <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                <button onClick={handleYes} className="bg-white text-purple-900 px-10 py-3 rounded-full font-cursive text-2xl hover:scale-105 transition-all shadow-lg">Correct!</button>
                <button onClick={handleNo} className="bg-white/5 border border-white/10 text-white px-10 py-3 rounded-full font-cursive text-2xl hover:bg-white/10 transition-all">Wrong...</button>
              </div>
            </div>
          )}

          {subStep === 'ask' && (
            <form onSubmit={handleCustomSubmit} className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-light">The Genie is lost! What is the answer?</h2>
              <input 
                autoFocus 
                value={inputVal} 
                onChange={e => setInputVal(e.target.value)}
                className="w-full bg-transparent border-b border-pink-400/50 p-4 text-center text-4xl focus:outline-none focus:border-pink-500 transition-all font-cursive"
              />
              <button type="submit" className="w-full bg-pink-500 py-4 rounded-2xl font-cursive text-3xl shadow-xl">Update the Universe</button>
            </form>
          )}

          {subStep === 'correct' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-5xl">✨</div>
              <p className="text-2xl font-cursive italic leading-relaxed text-purple-100">"{current.poeticTransition}"</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes scale-up { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default Quiz;
