const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

console.log('✅ games.js foi carregado!');

const gamesPath = path.join(__dirname, '../data/games.json');

// Função para ler o JSON com tratamento de erros
const readGames = () => {
  try {
    if (!fs.existsSync(gamesPath)) {
      console.warn('⚠️ Arquivo games.json não encontrado. Criando novo.');
      fs.writeFileSync(gamesPath, '[]');
    }

    const data = fs.readFileSync(gamesPath, 'utf-8');

    // Verifica se o arquivo está vazio e inicializa como array
    if (!data.trim()) {
      console.warn('⚠️ Arquivo vazio. Inicializando como array vazio.');
      return [];
    }

    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      console.error('❌ O conteúdo de games.json não é um array válido.');
      return [];
    }

    return parsed;
  } catch (err) {
    console.error('❌ Erro ao ler ou parsear games.json:', err.message);
    return [];
  }
};

// Função para escrever no JSON
const writeGames = (games) => {
  fs.writeFileSync(gamesPath, JSON.stringify(games, null, 2));
};

// Rota GET: retorna todas as partidas salvas
router.get('/', (req, res) => {
  try {
    const games = readGames();
    res.json(games);
  } catch (err) {
    console.error('❌ Erro na rota GET /games:', err.message);
    res.status(500).json({ error: 'Erro ao ler partidas' });
  }
});

// Rota POST: salva uma nova partida
router.post('/save', (req, res) => {
  try {
    const { round, score, coins, modifiers } = req.body;

    if (round == null || score == null || coins == null) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const games = readGames();

    const newGame = {
      id: Date.now(),
      round,
      score,
      coins,
      modifiers,
      timestamp: new Date().toISOString(),
    };

    games.push(newGame);
    writeGames(games);

    res.status(201).json({ message: 'Partida salva com sucesso!', game: newGame });
  } catch (err) {
    console.error('❌ Erro na rota POST /games/save:', err.message);
    res.status(500).json({ error: 'Erro ao salvar partida' });
  }
});

module.exports = router;
