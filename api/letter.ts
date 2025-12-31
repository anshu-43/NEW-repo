import type { VercelRequest, VercelResponse } from "@vercel/node";

const LETTERS = {
  romantic_poetic: `Dearest Tanvi,

As you step into your seventeenth year, it feels as though the universe has painted the twilight sky in your favorite shades of purple, just to celebrate the grace you’ve brought to the world since 2009. You have grown with the delicate elegance of a butterfly taking flight, carrying within you a sense of wonder as boundless and magical as the treasures found in Doraemon’s pocket.

For some time now, I have held a quiet admiration for you, carrying these feelings like a secret song I hum only to the silence of my own heart. I understand that hearts do not always beat in the same rhythm, and if yours cannot find a melody that matches mine, I accept that with gentle peace.

🥀
Yours, sincerely.
🥀`,

  friendly_soft: `Hey Tanvi 🌸

Happy 17th!
You’re someone who brings warmth just by being yourself. I hope this year brings smiles, calm days, and dreams slowly coming true.
Always cheering for you.`,

  playful_casual: `Yo Tanvi 😄

17 already? That’s crazy.
Hope this year is full of laughs, random fun moments, and good memories.
Stay awesome ✨`
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tone, style } = req.body || {};

  const key = `${tone}_${style}` as keyof typeof LETTERS;
  const letter = LETTERS[key] || LETTERS.romantic_poetic;

  res.status(200).json({ letter });
}
