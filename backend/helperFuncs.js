const fetch = require('node-fetch');

const fetchData = async (url) => {
  const data = await fetch(url);
  const parsedData = await data.json();
  return infoParser(parsedData);
}

const infoParser = data => {
  if (data.cod === '404') {
    return data;
  }

  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const feelsLike = data.main.feels_like;
  const temp_min = data.main.temp_min;
  const temp_max = data.main.temp_max;
  const pressure = data.main.pressure; // hPa
  const humidity = data.main.humidity;
  const cloudiness = data.clouds.all;
  const windSpeed = data.wind.speed;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const country = data.sys.country;
  const location = data.name;
  const iconRef = data.weather[0].icon;
  
  return {
    description,
    temperature,
    feelsLike,
    temp_min,
    temp_max,
    pressure,
    humidity,
    cloudiness,
    windSpeed,
    sunrise,
    sunset,
    country,
    location,
    iconRef
  };
};


module.exports = fetchData;