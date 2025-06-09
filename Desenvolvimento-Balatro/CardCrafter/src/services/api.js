// src/services/api.js

export async function getCards() {
  // Mock simples com 5 cartas
  return [
    { id: 1, rank: 'A', suit: '♠️' },
    { id: 2, rank: '10', suit: '♥️' },
    { id: 3, rank: 'K', suit: '♦️' },
    { id: 4, rank: '7', suit: '♣️' },
    { id: 5, rank: 'J', suit: '♠️' },
  ];
}
