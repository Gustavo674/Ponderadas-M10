const express = require('express');
const cors = require('cors');

const cardRoutes = require('./routes/cards');
const modifierRoutes = require('./routes/modifiers');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/cards', cardRoutes);
app.use('/modifiers', modifierRoutes);

try {
  const gameRoutes = require('./routes/games');
  app.use('/games', gameRoutes);
  console.log('✅ gameRoutes registrados com sucesso');
} catch (error) {
  console.error('❌ Erro ao importar gameRoutes:', error);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
