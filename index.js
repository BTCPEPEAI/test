import express from 'express';
import cors from 'cors';
import marketRoutes from './routes/market.js';
import tradeRoutes from './routes/trade.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/api', marketRoutes);
app.use('/api', tradeRoutes);

app.get('/', (req, res) => {
  res.send('Crypto API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors());
