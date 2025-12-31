
import React, { useState, useEffect } from 'react';
import { TARGET_DATE_STR } from '../constants';
import { storageService } from '../services/storageService';

interface ConfessionProps {
  preferences: any;
}

const ConfessionRoom: React.FC<ConfessionProps> = ({ preferences }) => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [elements, setElements] = useState<{id: number, left: number, delay: number, size: number}[]>([]);

      useEffect(() => {
  const fetchMessage = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/letter", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    tone: answers.tone,   // example: "romantic"
    style: answers.style // example: "poetic"
  })
});

const data = await response.json();
setLetter(data.letter);

      // ✅ Autosave using NEW response
      if (data.text) {
        storageService.saveMemory(
          "confession",
          "A Message from My Heart",
          data.text
        );
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setMessage("Something went wrong 😔");
    }
    };
    fetchMessage();

    const newElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: 14 + Math.random() * 16
    }));
    setElements(newElements);
  }, [preferences]);

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center py-12 px-4 w-full">
      {/* Subtle Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {elements.map(el => (
          <div
            key={el.id}
            className="absolute opacity-10 animate-float-up"
            style={{
              left: `${el.left}%`,
              bottom: '-30px',
              fontSize: `${el.size}px`,
              animation: `float-up ${12 + Math.random() * 8}s linear infinite`,
              animationDelay: `${el.delay}s`
            }}
          >
            {el.id % 2 === 0 ? '🥀' : '✨'}
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-3xl border border-white/5 p-10 md:p-16 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] max-w-2xl w-full z-10 relative text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-pink-500/20 rounded-b-full"></div>
        
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-cursive text-white mb-3">
            For Tanvi
          </h2>
          <div className="flex items-center justify-center space-x-3 opacity-40">
             <div className="h-px w-6 bg-white/50"></div>
             <p className="text-purple-300 font-mono text-[9px] tracking-[0.5em] uppercase font-bold">
               19 / 01 / 2026
             </p>
             <div className="h-px w-6 bg-white/50"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-8 py-20">
            <div className="w-8 h-8 border-2 border-white/10 border-t-pink-400 rounded-full animate-spin"></div>
            <p className="text-purple-200/30 italic font-light text-[10px] uppercase tracking-[0.4em]">Listening to the silence...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="prose prose-invert max-w-none mb-16 px-4">
              <p className="text-lg md:text-xl leading-[2.2] text-purple-100/90 font-light italic whitespace-pre-wrap">
                {message}
              </p>
            </div>
            
            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center space-y-6 animate-ethereal-glow">
              <p className="text-3xl font-cursive text-pink-200/80">Yours, sincerely.</p>
              <div className="text-5xl opacity-60 hover:scale-110 transition-transform cursor-default">🥀</div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { transform: translateY(-130vh) rotate(360deg); opacity: 0; }
        }
        @keyframes ethereal-glow {
          0%, 100% { opacity: 0.4; filter: blur(0px); }
          50% { opacity: 0.9; filter: blur(1px); }
        }
        .animate-ethereal-glow {
          animation: ethereal-glow 4s ease-in-out infinite;
        }
        .prose p { margin-bottom: 2rem; }
      `}</style>
    </div>
  );
};

export default ConfessionRoom;
