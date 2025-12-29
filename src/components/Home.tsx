
import React, { useEffect, useState } from 'react';
import { BIRTH_DATE_STR } from '../constants';
import { audioService } from '../services/audioService';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const birth = new Date(2009, 0, 19);
    const target = new Date(2026, 0, 19);
    const diff = target.getTime() - birth.getTime();
    setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8 text-center animate-fade-in relative w-full overflow-hidden">
      {/* Animated Angel Flying Around */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="angel-path w-full h-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-angel-orbit">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white opacity-80 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
                <path d="M7 8C7 8 3 7 2 11C1 15 5 15 5 15L7 8Z" fill="currentColor" className="animate-wing-left origin-right"/>
                <path d="M17 8C17 8 21 7 22 11C23 15 19 15 19 15L17 8Z" fill="currentColor" className="animate-wing-right origin-left"/>
                <circle cx="12" cy="2" r="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="animate-pulse"/>
             </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="text-9xl filter drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">✨</div>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-purple-900/60 backdrop-blur-2xl px-10 py-4 rounded-full border border-white/20 whitespace-nowrap shadow-[0_0_40px_rgba(244,114,182,0.3)] animate-badge-magical">
          <span className="text-pink-300 font-black text-xl tracking-wider">17 Years</span>
          <span className="mx-3 text-white/20">|</span>
          <span className="text-purple-200 font-mono tracking-widest">{days.toLocaleString()} Days</span>
        </div>
      </div>

      <div className="space-y-4 pt-10 z-10">
        <h1 className="text-8xl md:text-[10rem] font-cursive text-white drop-shadow-2xl animate-tanvi-magical select-none">
          Tanvi
        </h1>
        <p className="text-[10px] font-black tracking-[1.2em] text-purple-300/80 uppercase mt-4">
          Birthday • 19/01/2026
        </p>
        <p className="max-w-md mx-auto text-purple-100/70 leading-relaxed font-light italic text-sm px-6 mt-6">
          "A soul as vibrant as the stars, turning seventeen years of dreams into a reality that lights up everything around her."
        </p>
      </div>

      <button
        onClick={() => { audioService.playClick(); onStart(); }}
        className="group relative px-20 py-6 bg-white text-purple-900 rounded-full font-cursive text-2xl md:text-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 z-10 overflow-hidden"
      >
        <span className="relative z-10">Begin Adventure</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping"></div>
      </button>

      <style>{`
        @keyframes angel-orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(180px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes wing-left {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes wing-right {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes shimmer-tanvi {
          0% { background-position: -200% center; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
          50% { text-shadow: 0 0 30px rgba(244,114,182,0.6); }
          100% { background-position: 200% center; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
        }
        @keyframes badge-magical {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); box-shadow: 0 0 20px rgba(244,114,182,0.1); }
          50% { transform: translateX(-50%) translateY(-5px) scale(1.02); box-shadow: 0 0 40px rgba(244,114,182,0.4); }
        }
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .animate-tanvi-magical {
          background: linear-gradient(90deg, #fff 0%, #ffc0cb 25%, #fff 50%, #d8b4fe 75%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-tanvi 6s ease-in-out infinite;
        }
        .animate-badge-magical {
          animation: badge-magical 4s ease-in-out infinite;
        }
        .animate-angel-orbit {
          animation: angel-orbit 15s linear infinite;
        }
        .animate-wing-left {
          animation: wing-left 0.4s ease-in-out infinite;
        }
        .animate-wing-right {
          animation: wing-right 0.4s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 0.8s ease-in-out forwards;
        }
        @media (max-width: 768px) {
          @keyframes angel-orbit {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(130px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateX(130px) rotate(-360deg); }
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
