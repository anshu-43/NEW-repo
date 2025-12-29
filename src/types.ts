
export type Section = 'home' | 'game' | 'science' | 'quiz' | 'confession';

export interface QuizQuestion {
  id: string;
  label: string;
  guess: string;
  poeticTransition: string;
}

export interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface ScienceQuestion {
  subject: string;
  question: string;
  answer: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  note: string;
  color?: string;
}
