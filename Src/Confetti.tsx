
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

export const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#f472b6', '#a855f7', '#ec4899', '#ffffff', '#fbbf24', '#60a5fa'];
      const newPieces = Array.from({ length: 60 }, (_, i) => ({
        id: Math.random(),
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 8
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 3500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            borderRadius: '2px',
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            top: '-20px'
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { 
            transform: translateY(0) rotate(0deg) translateX(0); 
            opacity: 1; 
          }
          25% {
            transform: translateY(25vh) rotate(180deg) translateX(15px);
          }
          50% {
            transform: translateY(50vh) rotate(360deg) translateX(-15px);
          }
          75% {
            transform: translateY(75vh) rotate(540deg) translateX(10px);
          }
          100% { 
            transform: translateY(105vh) rotate(720deg) translateX(0); 
            opacity: 0; 
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall 3s cubic-bezier(0.2, 0.8, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
};
