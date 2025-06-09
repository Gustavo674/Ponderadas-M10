// src/services/api.js

const fullDeck = [];

const suits = ['♠️', '♥️', '♦️', '♣️'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let idCounter = 1;

suits.forEach(suit => {
  ranks.forEach(rank => {
    fullDeck.push({ id: idCounter++, rank, suit });
  });
});

export async function getCards() {
  // Shuffle deck and return 5 random cards
  const shuffled = fullDeck.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}
