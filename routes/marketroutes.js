const express = require('express');
const { getMarketData } = require('../controllers/marketController');
const router = express.Router();

router.get('/market', getMarketData);

module.exports = router;
