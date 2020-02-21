const locationInfo = document.querySelector('#location-information');
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const weatherInfo = document.querySelector('#weather-information');

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

/* Fetch data function */
const fetchData = () => {
  const city = searchInput.value;
  fetch(`http://localhost:5050/api/byCity/${city}`)
    .then(res => res.json())
    .then(res => appendData(res));
};

/* Add eventlistener on input to send it with enter */
searchInput.addEventListener('keypress', fetchData);
searchButton.addEventListener('click', fetchData);


const appendData = data => {
  if (data.cod === '404') {
    locationInfo.innerHTML = 'There was no match';
    weatherInfo.innerHTML = '';
  } else {
    const htmlOverview = `${data.location}, ${data.country} ${data.temperature}&#176C`;
    
    const htmlData = `
      <div class="row">
        <p>Feels like:</p>
        <p>${data.feelsLike}&#176C</p>
      </div>
      <div class="row">
        <p>Max temp:</p>
        <p>${data.temp_max}&#176C</p>
      </div>
      <div class="row">
        <p>Min temp:</p>
        <p>${data.temp_min}&#176C</p>
      </div>
      <div class="row">
        <p>Pressure:</p>
        <p>${data.pressure} hPa</p>
      </div>
      <div class="row">
        <p>Humidity:</p>
        <p>${data.humidity} %</p>
      </div>
      <div class="row">
        <p>Cloudiness:</p>
        <p>${data.cloudiness} %</p>
      </div>
      <div class="row">
        <p>Wind speed:</p>
        <p>${data.windSpeed} m/s</p>
      </div>
    `;
    locationInfo.innerHTML = htmlOverview;
    weatherInfo.innerHTML = htmlData;
  }
};


// const dateSunrise = new Date(sunrise * 1000);
// const formattedSunrise = `${dateSunrise.getHours()}:${dateSunrise.getMinutes()}`;
// const dateSunset = new Date(sunset * 1000);
// const formattedSunset = `${dateSunset.getHours()}:${dateSunset.getMinutes()}`;