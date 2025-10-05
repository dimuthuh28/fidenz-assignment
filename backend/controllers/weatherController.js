const {getWeatherByCityId} = require('../services/weatherService');
const cache = require('../utils/cache');

//controller

async function getWeather(req, res){
  const cityId = req.params.cityId;

  if(!cityId){
    return res.status(400).json({error: 'City ID is required'});
  }
  try{
    const cachedData = cache.get(cityId);
    if(cachedData){
      return res.json({source: 'cache', ...cachedData});
    }
    const weatherData = await getWeatherByCityId(cityId);
    cache.set(cityId, weatherData, 300);
    res.json({source: 'api', ...weatherData});
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
}

module.exports = {getWeather};