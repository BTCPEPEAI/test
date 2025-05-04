require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const marketRoutes = require('./routes/marketroutes');
const tradeRoutes = require('./routes/traderoutes');
const { connectToBinanceWs } = require('./utills/binanceWs');

const app = express();
app.use(cors()); // 🔥 Allow frontend access
app.use(express.json());

app.use('/api', marketRoutes);
app.use('/api', tradeRoutes);

connectToBinanceWs();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
