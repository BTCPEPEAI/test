const axios = require('axios');

const getOrderBook = async (symbol) => {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/depth`, {
      params: { symbol, limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order book:', error);
    return null;
  }
};

module.exports = { getOrderBook };
