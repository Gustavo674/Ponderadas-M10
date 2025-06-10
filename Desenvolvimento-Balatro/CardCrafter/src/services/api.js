const API_BASE = 'http://10.128.0.215:3001'; // Substitua pelo IP da sua máquina

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
