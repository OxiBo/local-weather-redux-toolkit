import axios from 'axios';
require('dotenv').config();

const KEY = process.env.REACT_APP_WEATHER_KEY;

const getWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  validateStatus: (status) => status >= 200 && status < 300,
});

const weatherInfo = async (lat, lon) => {

  // get weather if geolocation request succeeded
  if (lat && lon) {
    try {
      const weatherResponse = await getWeather.get('/weather?', {
        params: {
          appid: KEY,
          lat,
          lon,
          units: 'metric',
        },
      });
      
      const { main, weather, wind } = weatherResponse.data;

      const response = {
        updatedTime: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        }),
        icon: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
        temperature: main.temp,
        humidity: main.humidity,
        description: weather[0].description,
        additionalDescription: weather[0].main,
        windSpeed: wind.speed.toFixed(2),
        apiID: weather[0].id,
      };
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to load local weather.');
    }
  }
};

export { weatherInfo };
