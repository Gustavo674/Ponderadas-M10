const API_BASE = 'http://10.128.0.215:3001';

export async function getCards() {
  try {
    const response = await fetch(`${API_BASE}/cards`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar cartas:', error);
    return [];
  }
}

export async function getModifiers() {
  try {
    const response = await fetch(`${API_BASE}/modifiers`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar modificadores:', error);
    return [];
  }
}

export async function fetchHistory() {
  try {
    const response = await fetch(`${API_BASE}/games`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
}

export async function saveGame(gameData) {
  try {
    const response = await fetch(`${API_BASE}/games/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao salvar partida:', error);
    return null;
  }
}
