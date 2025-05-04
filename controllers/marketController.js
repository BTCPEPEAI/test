const Coin = require('../models/coinmodel');

const getMarketData = async (req, res) => {
  try {
    const coins = await Coin.find().limit(20);
    res.json(coins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market data', error });
  }
};

module.exports = { getMarketData };
