import express from 'express';
import {
  fetchOrderBook,
  fetchRecentTrades,
  fetchKlines,
  fetchTicker
} from '../services/binance.js';

const router = express.Router();

router.get('/trade/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const [orderBook, trades, klines, ticker] = await Promise.all([
      fetchOrderBook(symbol),
      fetchRecentTrades(symbol),
      fetchKlines(symbol),
      fetchTicker(symbol)
    ]);

    res.json({
      orderBook,
      trades,
      chartData: klines.map(k => ({
        time: k[0],
        open: k[1],
        high: k[2],
        low: k[3],
        close: k[4]
      })),
      ticker: {
        price: ticker.lastPrice,
        change: ticker.priceChangePercent,
        volume: ticker.volume,
        high: ticker.highPrice,
        low: ticker.lowPrice
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trade data' });
  }
});

export default router;
