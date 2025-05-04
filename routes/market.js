import express from 'express';
import { coinList } from '../utils/coinlist.js';
import { fetchTicker } from '../services/binance.js';

const router = express.Router();

router.get('/market', async (req, res) => {
  try {
    const results = await Promise.all(
      coinList.map(async (coin) => {
        const symbol = `${coin}USDT`;
        const data = await fetchTicker(symbol);
        return {
          symbol,
          price: data.lastPrice,
          change: data.priceChangePercent,
          high: data.highPrice,
          low: data.lowPrice,
          volume: data.volume,
        };
      })
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

export default router;
