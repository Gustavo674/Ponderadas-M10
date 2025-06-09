// src/services/api.js

// Cria um array vazio que vai representar um baralho completo
const fullDeck = [];

// Define os naipes disponíveis
const suits = ['♠️', '♥️', '♦️', '♣️'];

// Define os ranks (valores) disponíveis
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// ID incremental para cada carta
let idCounter = 1;

// Gera o baralho completo (52 cartas: 4 naipes * 13 ranks)
suits.forEach(suit => {
  ranks.forEach(rank => {
    fullDeck.push({ id: idCounter++, rank, suit });
  });
});

// Função exportada que simula a busca de cartas de uma API
// Retorna uma "mão" com 5 cartas aleatórias
export async function getCards() {
  // Embaralha o baralho
  const shuffled = fullDeck.sort(() => 0.5 - Math.random());
  
  // Retorna as 5 primeiras cartas do baralho embaralhado (simula uma mão de 5 cartas)
  return shuffled.slice(0, 5);
}
