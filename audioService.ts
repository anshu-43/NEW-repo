
class AudioService {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBGMPlaying = false;
  private currentVolume = 0.15;
  private snippetOscillators: (OscillatorNode | GainNode)[] = [];

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  startBGM() {
    this.init();
    if (this.isBGMPlaying || !this.ctx) return;
    this.isBGMPlaying = true;

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    this.bgmGain.connect(this.ctx.destination);

    const playLayer = (freq: number, detune: number, delay: number) => {
      if (!this.isBGMPlaying || !this.ctx || !this.bgmGain) return;
      
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = detune;

      const now = this.ctx.currentTime + delay;
      const duration = 12;

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.05, now + duration / 2);
      g.gain.linearRampToValueAtTime(0, now + duration);

      osc.connect(g);
      g.connect(this.bgmGain);
      
      osc.start(now);
      osc.stop(now + duration);

      setTimeout(() => playLayer(freq, detune, 0), (duration - 2) * 1000);
    };

    const baseFreq = 130.81; // C3
    playLayer(baseFreq, 0, 0);
    playLayer(baseFreq * 1.5, 5, 2);
    playLayer(baseFreq * 1.875, -5, 4);
    playLayer(baseFreq * 2.25, 10, 6);
    playLayer(baseFreq * 2.5, -10, 8);
  }

  setBGMVolume(volume: number) {
    this.currentVolume = volume;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
    }
  }

  toggleBGM(force?: boolean) {
    const target = force !== undefined ? force : !this.isBGMPlaying;
    if (target) {
      this.startBGM();
    } else {
      this.isBGMPlaying = false;
      if (this.bgmGain) {
        this.bgmGain.gain.setTargetAtTime(0, this.ctx?.currentTime || 0, 0.5);
      }
    }
    return target;
  }

  playMagic() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.5);
    });
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.3);
  }

  playMatch() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 880, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.4);
    });
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playSnippet(songId: string) {
    this.init();
    if (!this.ctx) return;
    this.stopSnippet();
    
    const now = this.ctx.currentTime;
    // Overhauled "Montagem Supersonic" engine
    // Fast BPM (approx 135)
    const bpm = 135;
    const beat = 60 / bpm;
    
    for (let i = 0; i < 32; i++) {
      const time = now + i * (beat / 2);
      
      // Kick drum simulation (every beat)
      if (i % 2 === 0) {
        const kick = this.ctx.createOscillator();
        const kickG = this.ctx.createGain();
        kick.frequency.setValueAtTime(150, time);
        kick.frequency.exponentialRampToValueAtTime(40, time + 0.1);
        kickG.gain.setValueAtTime(0.2, time);
        kickG.gain.linearRampToValueAtTime(0, time + 0.15);
        kick.connect(kickG);
        kickG.connect(this.ctx.destination);
        kick.start(time);
        kick.stop(time + 0.15);
        this.snippetOscillators.push(kick, kickG);
      }

      // Supersonic melody (sawtooth/square mix)
      const melodyOsc = this.ctx.createOscillator();
      const melodyG = this.ctx.createGain();
      
      // High-energy syncopated pattern
      const notes = [0, 0, 3, 0, 5, 0, 7, 10];
      const freq = 110 * Math.pow(2, (notes[i % 8] + 12) / 12);
      
      melodyOsc.type = i % 4 === 0 ? 'sawtooth' : 'square';
      melodyOsc.frequency.setValueAtTime(freq, time);
      
      melodyG.gain.setValueAtTime(0, time);
      melodyG.gain.linearRampToValueAtTime(0.08, time + 0.02);
      melodyG.gain.linearRampToValueAtTime(0, time + 0.1);
      
      melodyOsc.connect(melodyG);
      melodyG.connect(this.ctx.destination);
      melodyOsc.start(time);
      melodyOsc.stop(time + 0.1);
      this.snippetOscillators.push(melodyOsc, melodyG);
    }
  }

  stopSnippet() {
    this.snippetOscillators.forEach(node => {
      if (node instanceof OscillatorNode) {
        try { node.stop(); } catch (e) {}
      }
    });
    this.snippetOscillators = [];
  }
}

export const audioService = new AudioService();
