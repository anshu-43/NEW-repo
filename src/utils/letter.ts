export function generateLetter(preferences: any): string {
  const {
    name = "Tanvi",
    age = "17",
    favoriteColor = "purple",
    dreamPlace = "a place far from home",
    personality = "gentle and kind",
    vibe = "soft and comforting",
    hobby = "the little things you love",
    comfort = "peaceful silence",
    futureDream = "something beautiful",
    aesthetic = "flowers and stars",
  } = preferences || {};

  return `
Dearest ${name},

As you step into your ${age}th year, it feels as though the universe has dressed itself in shades of ${favoriteColor}, just to celebrate the presence you bring into the world.

There is something truly special about your ${personality} nature — the way you move through life with a ${vibe} warmth that makes everything around you feel lighter. Whether you are lost in ${hobby} or dreaming quietly about ${dreamPlace}, you carry a sense of wonder that feels rare and precious.

I know that ${comfort} brings you peace, and I hope you always find moments where the world slows down just enough for you to breathe, smile, and feel safe being exactly who you are. Your dreams of ${futureDream} aren’t small — they are reflections of the beautiful heart you carry.

This letter is not written with expectations, only honesty. Whether as someone special or simply as a steady presence in your life, I admire you from a place of sincerity and respect. Watching you grow, laugh, and chase your dreams is something I will always cherish.

May your days be filled with ${aesthetic}, quiet happiness, and moments that make you feel deeply understood.

🥀

Yours, sincerely.  
🥀
`;
}
