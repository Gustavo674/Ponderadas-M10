const express = require('express');
const router = express.Router();
const { generateHand } = require('../utils/cardGenerator');

router.get('/', (req, res) => {
  const hand = generateHand();
  res.json(hand);
});

module.exports = router;
