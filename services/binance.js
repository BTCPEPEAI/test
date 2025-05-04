import axios from 'axios';

const BINANCE_API = 'https://api.binance.com/api/v3';

export async function fetchTicker(symbol) {
  const res = await axios.get(`${BINANCE_API}/ticker/24hr?symbol=${symbol}`);
  return res.data;
}

export async function fetchOrderBook(symbol, limit = 20) {
  const res = await axios.get(`${BINANCE_API}/depth`, {
    params: { symbol, limit }
  });
  return res.data;
}

export async function fetchRecentTrades(symbol, limit = 20) {
  const res = await axios.get(`${BINANCE_API}/trades`, {
    params: { symbol, limit }
  });
  return res.data;
}

export async function fetchKlines(symbol, interval = '1h', limit = 50) {
  const res = await axios.get(`${BINANCE_API}/klines`, {
    params: { symbol, interval, limit }
  });
  return res.data;
}
