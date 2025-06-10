const express = require('express');
const cors = require('cors');
const cardRoutes = require('./routes/cards');
const modifierRoutes = require('./routes/modifiers');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/cards', cardRoutes);
app.use('/modifiers', modifierRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
