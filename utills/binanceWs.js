const WebSocket = require('ws');
const axios = require('axios');
const Coin = require('../models/coinmodel');

// Function to connect to Binance WebSocket for real-time data
const connectToBinanceWs = () => {
  const socket = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

  socket.on('open', () => {
    console.log('Connected to Binance WebSocket');
  });

  socket.on('message', async (data) => {
    const marketData = JSON.parse(data);

    // Loop through the 20 coin data and save it in the DB
    for (const coin of marketData) {
      await Coin.findOneAndUpdate(
        { symbol: coin.s },
        { $set: { price: coin.c, volume: coin.v, time: Date.now() } },
        { upsert: true }
      );
    }
  });

  socket.on('close', () => {
    console.log('Binance WebSocket closed');
  });
};

module.exports = { connectToBinanceWs };
