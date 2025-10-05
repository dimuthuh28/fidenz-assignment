const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cacheService = require('../utils/cache');

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHERMAP_API;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.cityCodes = this.loadCityCodes();
  }

  loadCityCodes() {
    try {
      const citiesPath = path.join(__dirname, '../cities.json');
      const citiesData = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
      return citiesData.List.map(city => ({
        CityCode: city.CityCode,
        CityName: city.CityName
      }));
    } catch (error) {
      console.error('Error loading cities:', error);
      return [];
    }
  }

  async fetchWeatherData(cityCode) {
    // Check cache first
    const cacheKey = `weather_${cityCode}`;
    const cachedData = cacheService.get(cacheKey);
    
    if (cachedData) {
      console.log(`Cache hit for city ${cityCode}`);
      return { ...cachedData, fromCache: true };
    }

    // Fetch from API
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          id: cityCode,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const weatherData = {
        cityCode: cityCode,
        name: response.data.name,
        description: response.data.weather[0].description,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        icon: response.data.weather[0].icon,
        fromCache: false
      };

      // Store in cache
      cacheService.set(cacheKey, weatherData);
      
      return weatherData;
    } catch (error) {
      console.error(`Error fetching weather for city ${cityCode}:`, error.message);
      throw error;
    }
  }

  async fetchAllWeatherData() {
    const weatherPromises = this.cityCodes.map(city => 
      this.fetchWeatherData(city.CityCode)
        .catch(error => ({
          cityCode: city.CityCode,
          name: city.CityName,
          error: error.message
        }))
    );

    return await Promise.all(weatherPromises);
  }

  getCityCodes() {
    return this.cityCodes;
  }
}

module.exports = new WeatherService();