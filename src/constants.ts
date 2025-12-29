
import { QuizQuestion, ScienceQuestion } from './types';

export const BIRTH_DATE_STR = "19/01/2009";
export const TARGET_DATE_STR = "19/01/2026";

export const TANVI_QUIZ_DATA: (QuizQuestion & { options: string[] })[] = [
  {
    id: 'color',
    label: 'favorite color',
    guess: 'Purple',
    options: ['Pink', 'Red', 'Blue', 'Yellow', 'Lavender', 'Teal'],
    poeticTransition: "A color that speaks of royalty and magic, just like your presence."
  },
  {
    id: 'insect',
    label: 'favorite insect',
    guess: 'Butterfly',
    options: ['Ladybug', 'Bee', 'Dragonfly', 'Moth', 'Firefly', 'Ant'],
    poeticTransition: "I see your soul in their wings—fragile, beautiful, and constantly evolving."
  },
  {
    id: 'food',
    label: 'go-to comfort food',
    guess: 'Samgyupsal',
    options: ['Pizza', 'Burger', 'Ice Cream', 'Ramen', 'Pasta', 'Samgyupsal'],
    poeticTransition: "Something warm and satisfying, much like the conversations we share."
  },
  {
    id: 'cartoon',
    label: 'favorite cartoons',
    guess: 'Doraemon & Shinchan',
    options: ['Tom & Jerry', 'Shinchan', 'Pokémon', 'Ben 10', 'Doraemon', 'Chhota Bheem'],
    poeticTransition: "A mix of miracles and mischief, exactly what makes you so fun to be around."
  },
  {
    id: 'hobby',
    label: 'favorite hobby',
    guess: 'Listening to Music',
    options: ['Reading', 'Drawing', 'Dancing', 'Gaming', 'Listening to Music', 'Sleeping'],
    poeticTransition: "Finding a rhythm in the chaos, just like how you find peace in your own world."
  },
  {
    id: 'destination',
    label: 'dream destination',
    guess: 'Korea',
    options: ['Paris', 'Japan', 'Korea', 'Switzerland', 'New York', 'Bali'],
    poeticTransition: "A place of beauty and culture, where I imagine you'd shine the brightest."
  },
  {
    id: 'drama',
    label: 'memorable drama',
    guess: 'Ang Mutya Ng Section E',
    options: ['Meteor Garden', 'The Heirs', 'Kadenang Ginto', 'Section E', 'Wildflower', 'Mara Clara'],
    poeticTransition: "A story of strength and section pride... much like how you stand out in every room."
  },
  {
    id: 'talent',
    label: 'hidden talent',
    guess: 'Making people smile',
    options: ['Singing', 'Cooking', 'Making people smile', 'Photography', 'Writing', 'Debating'],
    poeticTransition: "The most beautiful gift one can have, and you do it so effortlessly."
  }
];

export const SCIENCE_QUESTIONS: ScienceQuestion[] = [
  {
    subject: "CHEMISTRY",
    question: "What is the result of mixing my quiet admiration with your kindness?",
    answer: "A rare bond where even a simple 'hello' from you becomes the highlight of my entire week."
  },
  {
    subject: "PHYSICS",
    question: "Why do I always find myself orbiting around you?",
    answer: "Because you have a natural warmth that pulls me in, making me wish I could just be a part of your world, even if only as a friend."
  },
  {
    subject: "BIOLOGY",
    question: "How does my heart react when I see you walking by?",
    answer: "It speeds up with a hope that maybe today is the day I find the courage to be more than just a face in the crowd to you."
  },
  {
    subject: "ASTRONOMY",
    question: "What is the distance between my heart and your world?",
    answer: "Light years in physical space, yet only a single thought away in the universe of my dreams."
  },
  {
    subject: "PSYCHOLOGY",
    question: "Why does the sound of your name feel like a melody?",
    answer: "Because it triggers a release of joy that overcomes any sadness, a Pavlovian response to pure goodness."
  },
  {
    subject: "MATHEMATICS",
    answer: "It is an infinite sum of small acts of kindness and respect. I truly value the equation of our friendship as it stands.",
    question: "How do you calculate the value of a true friend?"
  }
];

export const MEMORY_SYMBOLS = ["💜", "🦋", "🥀", "🌹", "✨", "💌", "🌸", "💖"];
