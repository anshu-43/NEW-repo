
import React, { useState, useEffect } from 'react';
import { MEMORY_SYMBOLS } from '../constants';
import { MemoryCard } from '../types';
import { audioService } from '../services/audioService';
import { Confetti } from './Confetti';

interface MemoryGameProps {
  onComplete: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const initialCards = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, idx) => ({
        id: idx,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(initialCards);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    audioService.playClick();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setTimeout(() => {
          audioService.playMatch();
          triggerConfetti();
          const finalCards = [...newCards];
          finalCards[first].isMatched = true;
          finalCards[second].isMatched = true;
          setCards(finalCards);
          setFlippedIndices([]);
          setMatches(m => m + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matches === MEMORY_SYMBOLS.length && matches > 0) {
      setTimeout(onComplete, 1500);
    }
  }, [matches, onComplete]);

  return (
    <div className="flex flex-col items-center space-y-6 py-8 w-full">
      <Confetti active={showConfetti} />
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-cursive">The Memory of Us</h2>
        <p className="text-purple-200 text-sm">Every match is a reason why you're special.</p>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-md w-full">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square rounded-xl text-2xl md:text-3xl flex items-center justify-center transition-all duration-300 transform ${
              card.isMatched
                ? 'bg-white text-purple-600 rotate-0 shadow-[0_0_20px_rgba(255,255,255,0.6)] animate-match-pulse z-10'
                : card.isFlipped
                  ? 'bg-white text-purple-600 rotate-0 shadow-inner'
                  : 'bg-purple-800 text-transparent rotate-180 hover:bg-purple-700 shadow-xl'
            } border-2 border-purple-400/30`}
          >
            {(card.isFlipped || card.isMatched) ? card.symbol : '?'}
          </button>
        ))}
      </div>

      <div className="text-[10px] font-mono bg-white/10 px-6 py-2 rounded-full border border-white/10 uppercase tracking-widest">
        Found {matches} / {MEMORY_SYMBOLS.length}
      </div>

      <style>{`
        @keyframes match-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(244,114,182,0.8); }
          100% { transform: scale(1); }
        }
        .animate-match-pulse {
          animation: match-pulse 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;
