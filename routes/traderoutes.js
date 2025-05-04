const express = require('express');
const { getOrderBook } = require('../services/binanceService');
const router = express.Router();

router.get('/order-book/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const data = await getOrderBook(symbol);
  res.json(data);
});

module.exports = router;
