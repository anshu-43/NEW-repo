
export interface SavedMemory {
  id: string;
  timestamp: number;
  type: 'theory' | 'preference' | 'confession';
  title: string;
  content: string;
}

export interface AppState {
  activeSection: string;
  unlockedSections: string[];
  preferences: any;
}

class StorageService {
  private STORAGE_KEY = 'tanvi_birthday_memories_2026';
  private STATE_KEY = 'tanvi_birthday_app_state_v1';

  // Silent background save - no popups
  saveMemory(type: SavedMemory['type'], title: string, content: string) {
    const memories = this.getAllMemories();
    const newMemory: SavedMemory = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      type,
      title,
      content
    };
    
    // Confessions are unique, only keep the latest one
    if (type === 'confession') {
      const filtered = memories.filter(m => m.type !== 'confession');
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([newMemory, ...filtered]));
    } else {
      // Overwrite if entry with same title exists (for autosave drafts)
      const filtered = memories.filter(m => !(m.type === type && m.title === title));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([newMemory, ...filtered]));
    }
  }

  getAllMemories(): SavedMemory[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }

  saveAppState(state: AppState) {
    localStorage.setItem(this.STATE_KEY, JSON.stringify(state));
  }

  loadAppState(): AppState | null {
    const stored = localStorage.getItem(this.STATE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
}

export const storageService = new StorageService();
