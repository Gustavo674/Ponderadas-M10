const suits = ['♠️', '♥️', '♦️', '♣️'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function generateHand(count = 5) {
  const hand = [];
  while (hand.length < count) {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const card = { suit, rank };
    hand.push(card);
  }
  return hand;
}

module.exports = { generateHand };
