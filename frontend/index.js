const weatherInfo = document.querySelector('#weather-info');
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const overView = document.querySelector('#overview');
/* Get current location of user at start */
(function getLocationOfUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(`http://localhost:5050/api/byCoordinates/${lat}/${lon}`)
        .then(res => res.json())
        .then(res => appendData(res));
    });
  }
})();

searchButton.addEventListener('click', e => {
  e.preventDefault();

  const city = searchInput.value;
  fetch(`http://localhost:5050/api/byCity/${city}`)
    .then(res => res.json())
    .then(res => appendData(res));
});

const appendData = data => {
  if (data.cod === '404') {
    weatherInfo.innerHTML = 'There was no match';
  } else {
    const { description,
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
      iconRef } = data;

      

      const dateSunrise = new Date(sunrise * 1000);
      const formattedSunrise = `${dateSunrise.getHours()}:${dateSunrise.getMinutes()}`;
      const dateSunset = new Date(sunset * 1000);
      const formattedSunset = `${dateSunset.getHours()}:${dateSunset.getMinutes()}`;
    
      const htmlOverview = `<h2>${location}, ${country}  <img src="http://openweathermap.org/img/w/${iconRef}.png" /><h2>
                            
                             <p>${description} ${temperature}&#176C</p>`;

      const htmlData = `<div id="weather-description">
                      <p>Feels like:</p>
                      <p>Max temperature:</p>
                      <p>Minimun temperature:</p>
                      <p>Sunrise:</p>
                      <p>Sunset:</p>
                      <p>Pressure:</p>
                      <p>Humidity:</p>
                      <p>Cloudiness:</p>
                      <p>Wind:</p>
                    </div>
                    <div id="weather-data">
                      <p>${feelsLike}&#176C</p>
                      <p>${temp_max}&#176C</p>
                      <p>${temp_min}&#176C</p>
                      <p>${formattedSunrise}</p>
                      <p>${formattedSunset}</p>
                      <p>${pressure}hPa</p>
                      <p>${humidity}%</p>
                      <p>${cloudiness}%</p>
                      <p>${windSpeed}m/s</p>
                    </div>`;
    
      weatherInfo.innerHTML = htmlData;
      overView.innerHTML = htmlOverview;
  }
};

