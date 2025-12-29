
import React, { useState } from 'react';
import { Section } from '../types';
import { audioService } from '../services/audioService';

interface ResetDialogProps {
  unlockedSections: Set<Section>;
  onClose: () => void;
  onReset: (start: Section, end: Section) => void;
}

const SECTION_ORDER: Section[] = ['game', 'science', 'quiz', 'confession'];
const SECTION_NAMES: Record<Section, string> = {
  home: 'Home',
  game: 'Memory Game',
  science: 'Theory Session',
  quiz: 'Genie Quiz',
  confession: 'The Confession'
};

const ResetDialog: React.FC<ResetDialogProps> = ({ unlockedSections, onClose, onReset }) => {
  const [startSection, setStartSection] = useState<Section>('game');
  const [endSection, setEndSection] = useState<Section>('confession');

  const availableSections = SECTION_ORDER.filter(s => unlockedSections.has(s));

  const handleConfirm = () => {
    audioService.playPop();
    onReset(startSection, endSection);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-purple-950/90 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12 text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-cursive text-white">Rewind the Timeline</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-purple-300 font-bold">Relock chapters to experience them again</p>
        </div>

        {availableSections.length === 0 ? (
          <div className="py-8 space-y-4 opacity-50">
            <p className="text-sm italic">No chapters have been unlocked yet.</p>
            <button onClick={onClose} className="font-cursive text-xl text-white underline underline-offset-4">Go Back</button>
          </div>
        ) : (
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-white/40 block ml-2">From where you want to reset:</label>
              <select 
                value={startSection}
                onChange={(e) => setStartSection(e.target.value as Section)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-cursive text-xl focus:outline-none focus:border-pink-500/50 appearance-none cursor-pointer"
              >
                {availableSections.map(s => (
                  <option key={s} value={s} className="bg-purple-900 text-white">{SECTION_NAMES[s]}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-white/40 block ml-2">Till where it should be reset:</label>
              <select 
                value={endSection}
                onChange={(e) => setEndSection(e.target.value as Section)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-cursive text-xl focus:outline-none focus:border-pink-500/50 appearance-none cursor-pointer"
              >
                {availableSections.map(s => (
                  <option key={s} value={s} className="bg-purple-900 text-white">{SECTION_NAMES[s]}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex flex-col space-y-4">
              <button 
                onClick={handleConfirm}
                className="w-full bg-pink-600 text-white py-4 rounded-full font-cursive text-2xl shadow-lg hover:bg-pink-500 transition-all hover:scale-105 active:scale-95"
              >
                Rewrite History
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-transparent text-white/40 py-2 rounded-full font-cursive text-lg hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] text-purple-300/30 italic px-4">
          * Note: Your saved memories in the Vault will be preserved even after resetting.
        </p>
      </div>
    </div>
  );
};

export default ResetDialog;
