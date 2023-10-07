import { getLocation } from './config.mjs';

console.log(getLocation)

// **********************UNSPLASH API**********************
fetch('http://localhost:5501/getBackground/')
  .then(response => response.json())
  .then(data => {
    console.log('BACKGROUND API DATA', data)
    document.getElementById('background-image').setAttribute('src', data[0].urls.full)
    document.getElementById('first-name').innerText = data[0].user.first_name || ''
    document.getElementById('last-name').innerText = data[0].user.last_name || ''
  })

// **********************WEATHER API**********************
  getLocation((lat, lon) => {

    // if (error) {
    //   console.error(error.message);
    //   return;
    // }
    // Here, you can send `lat` and `lon` to your server or do whatever you need
    fetch(`http://localhost:5501/getWeather/?lat=${lat}&lon=${lon}`)
    // ... handle the fetch response
    .then(response => response.json())
    .then(data => {
      document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />`
      document.getElementById('temp').innerText = ` current temperature ${Math.round(data.main.temp) + '°'|| ''}`
      document.getElementById('feels-like').innerText = `Feels like ${Math.round(data.main.feels_like) + '°' || ''}`
      document.getElementById('condition').innerText = `${data.weather[0].description || ''}`
      document.getElementById('city').innerText = `${(data.name) || ''}`

    })
});