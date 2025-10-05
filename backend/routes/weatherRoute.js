const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');
const { requireAuth } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(requireAuth);

// Get all cities
router.get('/cities', (req, res) => {
  try {
    const cities = weatherService.getCityCodes();
    res.json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get weather for all cities
router.get('/all', async (req, res) => {
  try {
    const weatherData = await weatherService.fetchAllWeatherData();
    res.json({ success: true, data: weatherData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get weather for specific city
router.get('/:cityCode', async (req, res) => {
  try {
    const { cityCode } = req.params;
    const weatherData = await weatherService.fetchWeatherData(cityCode);
    res.json({ success: true, data: weatherData });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

module.exports = router;