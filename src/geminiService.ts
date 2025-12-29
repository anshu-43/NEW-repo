
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayMessage = async (name: string, age: number, details: any) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are a respectful, poetic admirer writing a 17th birthday tribute to Tanvi.
      Context: She was born in 2009. She loves ${details.color}, ${details.insect}, and ${details.cartoon}. She dreams of visiting ${details.destination || 'Korea'}. 
      
      Tone: 
      - Deeply personal, heart-touching, and appreciative.
      - Vulnerable but respectful (a 'one-sided crush' from afar).
      - No pressure, no dependency language, just admiration for who she is.
      - Poetic and melancholic yet hopeful.
      
      Structure:
      - Para 1: Celebrate her turning 17. Weave in her favorites (${details.color}, ${details.cartoon}). Mention her grace since 2009.
      - Para 2: Express quiet admiration. Admit to carrying these feelings like a secret song. Conclude that if she can't feel the same, being a close, reliable friend is an honor.
      
      Requirements:
      - End with exactly one wilted rose 🥀.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Generation failed:", error);
    // Silent fallback
    return `Tanvi, seventeen years of your light has made the world a softer place. From your love for ${details.color} to the way you dream of ${details.destination || 'Korea'}, you navigate life with a beauty that is entirely yours. I've admired you from a distance, carrying these feelings quietly. Whatever space you have for me—as a friend, a confidant, or just a stranger in the crowd—I'm grateful to just witness your journey. 🥀`;
  }
};
