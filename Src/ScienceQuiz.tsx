
import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { SCIENCE_QUESTIONS } from '../constants';
import { Confetti } from './Confetti';
import { storageService } from '../services/storageService';

const ScienceQuiz: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<'question' | 'input' | 'comment' | 'answer'>('question');
  const [userTheory, setUserTheory] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const current = SCIENCE_QUESTIONS[idx];

  // Debounced silent autosave for theories
  useEffect(() => {
    if (step === 'input' && userTheory.trim().length > 2) {
      const timer = setTimeout(() => {
        storageService.saveMemory('theory', `Your Theory: ${current.subject}`, userTheory);
      }, 1000); // Save after 1 second of inactivity
      return () => clearTimeout(timer);
    }
  }, [userTheory, step, current.subject]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleRevealDirectly = () => {
    audioService.playClick();
    triggerConfetti();
    setStep('answer');
  };

  const handleWantsToAnswer = () => {
    audioService.playClick();
    setStep('input');
  };

  const handleSubmitTheory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTheory.trim()) return;
    
    // Final save of her theory
    storageService.saveMemory('theory', `Your Theory: ${current.subject}`, userTheory);
    
    audioService.playSuccess();
    setStep('comment');
    setTimeout(() => {
      triggerConfetti();
      setStep('answer');
    }, 4000);
  };

  const handleNext = () => {
    audioService.playClick();
    if (idx < SCIENCE_QUESTIONS.length - 1) {
      setIdx(idx + 1);
      setStep('question');
      setUserTheory('');
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-2xl px-4 flex flex-col items-center justify-center min-h-[60vh] py-10">
      <Confetti active={showConfetti} />
      <div className="bg-black/20 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 text-center shadow-2xl w-full min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-10">
          <span className="text-pink-400/80 font-mono text-[9px] tracking-[0.4em] border border-pink-400/20 px-4 py-1.5 rounded-full uppercase">
            Theory {idx + 1}: {current.subject}
          </span>
        </div>
        
        {step === 'question' && (
          <div className="animate-fade-in space-y-12">
            <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-purple-100 italic">
              "{current.question}"
            </h2>
            <div className="flex flex-col space-y-4 items-center">
               <p className="text-purple-300/60 text-base font-cursive">Do you have your own theory about this?</p>
               <div className="flex space-x-6">
                  <button 
                    onClick={handleWantsToAnswer}
                    className="bg-white text-purple-900 px-12 py-3 rounded-full font-cursive text-2xl hover:scale-110 active:scale-95 transition-all shadow-lg"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={handleRevealDirectly}
                    className="bg-white/5 border border-white/20 text-white px-12 py-3 rounded-full font-cursive text-2xl hover:bg-white/10 active:scale-95 transition-all"
                  >
                    No
                  </button>
               </div>
            </div>
          </div>
        )}

        {step === 'input' && (
          <form onSubmit={handleSubmitTheory} className="animate-fade-in space-y-8 w-full max-w-md">
            <h3 className="text-2xl font-cursive text-purple-200">Share your thoughts with me...</h3>
            <textarea 
              autoFocus
              value={userTheory}
              onChange={(e) => setUserTheory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-lg focus:outline-none focus:border-pink-500/50 transition-all font-light italic min-h-[140px] text-white"
              placeholder="I think the answer is..."
            />
            <button 
              type="submit"
              className="bg-purple-500 text-white px-12 py-4 rounded-full font-cursive text-2xl shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-transform"
            >
              Submit My Theory
            </button>
          </form>
        )}

        {step === 'comment' && (
          <div className="animate-fade-in space-y-8 max-w-md">
            <div className="text-6xl animate-bounce">✨</div>
            <p className="text-2xl md:text-3xl font-cursive text-pink-200 leading-relaxed italic px-4">
              "Oh you think that way, great... But in my opinion I've a different answer..."
            </p>
          </div>
        )}

        {step === 'answer' && (
          <div className="animate-fade-in space-y-12">
            <div className="space-y-4">
              <p className="text-base font-cursive text-white/50">The Truth According to My Heart</p>
              <div className="h-px w-20 bg-pink-500/20 mx-auto mb-6"></div>
              <p className="text-2xl md:text-4xl font-cursive text-white leading-relaxed italic px-6">
                "{current.answer}"
              </p>
            </div>
            <button 
              onClick={handleNext}
              className="bg-white text-purple-900 px-14 py-4 rounded-full font-cursive text-2xl hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Next Theory
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 text-white/20 text-[9px] tracking-[0.8em] uppercase font-bold">
        Theoretical Sync in Progress
      </div>
    </div>
  );
};

export default ScienceQuiz;
