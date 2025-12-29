
import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { Song } from '../types';

const SPECIAL_SONG: Song = { 
  id: 'supersonic', 
  title: 'Montagem Supersonic', 
  artist: 'Phonk / Montagem', 
  note: 'Fast, intense, and absolutely electric—just like you. ⚡🔥', 
  color: 'bg-indigo-600' 
};

const SongLibrary: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (isPlaying) {
      audioService.stopSnippet();
      setIsPlaying(false);
    } else {
      audioService.playSnippet(SPECIAL_SONG.id);
      setIsPlaying(true);
      // Automatically reset after snippet length
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    return () => {
      audioService.stopSnippet();
    };
  }, []);

  return (
    <div className="w-full max-w-2xl px-4 py-8 flex flex-col items-center space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-6xl md:text-7xl font-cursive text-white">The Power Track</h2>
        <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-12 bg-indigo-500/30"></div>
            <p className="text-indigo-300/60 uppercase text-[10px] tracking-[0.8em] font-bold">Unstoppable Energy</p>
            <div className="h-px w-12 bg-indigo-500/30"></div>
        </div>
      </div>

      <div className="w-full max-w-md pt-12 relative group">
        {/* Instagram Style Note - High Energy Style */}
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-8 py-4 rounded-[2rem] rounded-bl-none shadow-[0_20px_50px_rgba(79,70,229,0.3)] transform -rotate-2 group-hover:rotate-0 transition-all duration-700 z-30 border border-white/20 backdrop-blur-2xl ${isPlaying ? 'bg-indigo-600 text-white scale-110' : 'bg-white/10 text-indigo-100 opacity-80'}`}>
          <p className="text-sm font-bold tracking-tight italic">"{SPECIAL_SONG.note}"</p>
          <div className="absolute -bottom-2 left-0 w-4 h-4 bg-inherit transform rotate-45 -translate-x-1/2"></div>
        </div>
        
        {/* Single Prominent Player Card */}
        <div className={`backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-12 flex flex-col items-center text-center space-y-8 transition-all duration-1000 relative overflow-hidden ${
          isPlaying ? 'bg-indigo-900/40 shadow-[0_0_80px_rgba(79,70,229,0.3)] scale-[1.02]' : 'bg-purple-900/20 shadow-2xl'
        }`}>
          {isPlaying && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:24px_24px] animate-float"></div>
              </div>
            </>
          )}
          
          <div className="relative z-10 space-y-4">
            <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all duration-700 ${isPlaying ? 'bg-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.6)] scale-110 animate-bounce-slow' : 'bg-white/5 border border-white/10'}`}>
               {isPlaying ? (
                  <div className="flex items-end space-x-2 h-10">
                    <div className="w-1.5 bg-white animate-music-bar-1 rounded-full"></div>
                    <div className="w-1.5 bg-white animate-music-bar-2 rounded-full"></div>
                    <div className="w-1.5 bg-white animate-music-bar-3 rounded-full"></div>
                    <div className="w-1.5 bg-white animate-music-bar-2 rounded-full"></div>
                    <div className="w-1.5 bg-white animate-music-bar-1 rounded-full"></div>
                  </div>
               ) : (
                  <div className="text-4xl opacity-40">⚡</div>
               )}
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-4xl font-black tracking-tighter transition-all duration-500 ${isPlaying ? 'text-white scale-110' : 'text-purple-100'}`}>{SPECIAL_SONG.title}</h3>
              <p className={`text-xs uppercase tracking-[0.4em] font-bold transition-opacity ${isPlaying ? 'text-indigo-300' : 'text-white/30'}`}>{SPECIAL_SONG.artist}</p>
            </div>
          </div>
          
          <button 
            onClick={handlePlay}
            className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
              isPlaying ? 'bg-white text-indigo-900 scale-110 shadow-2xl' : 'bg-indigo-600 text-white shadow-xl hover:scale-110'
            }`}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"></path></svg>
            )}
            {!isPlaying && <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20"></div>}
          </button>
        </div>
      </div>

      <div className="pt-12">
        <button 
            onClick={() => { audioService.playClick(); onComplete(); }}
            className="group relative px-24 py-5 bg-white text-indigo-900 rounded-full font-cursive text-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
        >
            <span className="relative z-10">Continue Adventure</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full group-hover:animate-shine"></div>
        </button>
      </div>

      <style>{`
        @keyframes music-bar-1 { 0%, 100% { height: 8px; } 50% { height: 32px; } }
        @keyframes music-bar-2 { 0%, 100% { height: 32px; } 50% { height: 16px; } }
        @keyframes music-bar-3 { 0%, 100% { height: 16px; } 50% { height: 24px; } }
        .animate-music-bar-1 { animation: music-bar-1 0.4s infinite; }
        .animate-music-bar-2 { animation: music-bar-2 0.5s infinite; }
        .animate-music-bar-3 { animation: music-bar-3 0.3s infinite; }
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 1s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: scale(1.1) translateY(0); }
          50% { transform: scale(1.15) translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SongLibrary;
