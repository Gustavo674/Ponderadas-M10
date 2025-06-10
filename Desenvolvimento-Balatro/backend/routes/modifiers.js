const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const modifiersPath = path.join(__dirname, '../data/modifiers.json');

router.get('/', (req, res) => {
  const data = fs.readFileSync(modifiersPath, 'utf-8');
  const modifiers = JSON.parse(data);
  res.json(modifiers);
});

module.exports = router;
