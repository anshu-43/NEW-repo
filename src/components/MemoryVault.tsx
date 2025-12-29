
import React, { useState } from 'react';
import { storageService, SavedMemory } from '../services/storageService';

const MemoryVault: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const memories = storageService.getAllMemories();
  const [selectedMemory, setSelectedMemory] = useState<SavedMemory | null>(null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-purple-950/90 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-3xl font-cursive text-white">Your Memory Vault</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-purple-300 font-bold">Autosaved fragments of your journey</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {memories.length === 0 ? (
            <div className="py-20 text-center space-y-4 opacity-40">
              <div className="text-5xl">🗝️</div>
              <p className="text-sm font-light italic">The vault is quiet. Unlock more chapters to fill it with memories.</p>
            </div>
          ) : (
            memories.map((m) => (
              <div 
                key={m.id} 
                className="group bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all cursor-pointer relative"
                onClick={() => setSelectedMemory(m)}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    m.type === 'theory' ? 'bg-blue-500/20 text-blue-300' : 
                    m.type === 'preference' ? 'bg-pink-500/20 text-pink-300' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {m.type}
                  </span>
                  <span className="text-[8px] text-white/20 font-mono">
                    {new Date(m.timestamp).toLocaleString()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/90">{m.title}</h3>
                  <p className="text-sm text-purple-200/70 italic leading-relaxed whitespace-pre-wrap line-clamp-2 mt-2">
                    "{m.content}"
                  </p>
                </div>
                <div className="pt-2">
                  <button className="text-pink-300/60 font-cursive text-lg group-hover:text-pink-300 transition-colors">
                    Read Full Entry →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-6 bg-black/20 text-center space-y-2">
           <p className="text-[10px] text-purple-200/50 italic leading-tight">
             "Memories are stored locally in this browser realm. To keep them forever, consider taking a screenshot of your favorite fragments."
           </p>
        </div>
      </div>

      {/* Detailed Full Memory View Overlay */}
      {selectedMemory && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedMemory(null)}></div>
          <div className="relative w-full max-w-xl bg-purple-900/40 border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setSelectedMemory(null)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="text-center space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-pink-400 bg-pink-500/10 px-4 py-1.5 rounded-full">
                {selectedMemory.type}
              </span>
              <h2 className="text-4xl md:text-5xl font-cursive text-white">{selectedMemory.title}</h2>
              <div className="h-px w-20 bg-white/10 mx-auto"></div>
              <p className="text-xl md:text-2xl leading-[1.8] text-purple-100 font-light italic whitespace-pre-wrap font-cursive">
                {selectedMemory.content}
              </p>
              <div className="pt-8">
                 <button 
                   onClick={() => setSelectedMemory(null)}
                   className="bg-white text-purple-900 px-12 py-3 rounded-full font-cursive text-2xl hover:scale-105 transition-all shadow-xl"
                 >
                   Back to Vault
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default MemoryVault;
