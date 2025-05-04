const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  symbol: { type: String, unique: true },
  price: String,
  volume: String,
  time: Date,
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
