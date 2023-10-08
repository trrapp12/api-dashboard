import { getLocation } from './config.mjs';

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
    // Here, you can send `lat` and `lon` to your server or do whatever you need
    fetch(`http://localhost:5501/getWeather/?lat=${lat}&lon=${lon}`)
    // ... handle the fetch response
    .then(response => response.json())
    .then(data => {
        const weatherIconLookupTable = new Map ([
          ['01d' , 'assets/Orion_sun.png'],
          ['01n' , 'assets/Orion_half-moon.png'],
          ['02d' , 'assets/Orion_clouds.png'],
          ['02n' , 'assets/Orion_clouds.png'],
          ['03d' , 'assets/Orion_clouds.png'],
          ['03n' , 'assets/Orion_clouds.png'],
          ['04d' , 'assets/Orion_clouds.png'],
          ['04n' , 'assets/Orion_clouds.png'],
          ['09d' , 'assets/Orion_light-rain.png'],
          ['09n' , 'assets/Orion_light-rain.png'],
          ['10d' , 'assets/Orion_rain.png'],
          ['10n' , 'assets/Orion_rain.png'],
          ['11d' , 'assets/Orion_thunderstorm-rain.png'],
          ['11n' , 'assets/Orion_thunderstorm-rain.png'],
          ['13d' , 'assets/Orion_snow.png'],
          ['13n' , 'assets/Orion_snow.png'],
          ['50d' , 'assets/Orion_fog.png'],
          ['50n' , 'assets/Orion_fog.png']
        ]);

        if (weatherIconLookupTable.has(data.weather[0].icon)) {
          let source = weatherIconLookupTable.get(data.weather[0].icon)
          document.getElementById('weather-icon').innerHTML = `<img src=${source} alt="weather icon" />`
        }
      // iconLookUpTable (data.weather[0].icon) for lookup table here
      document.getElementById('temp').innerText = ` current temperature ${Math.round(data.main.temp) + '°'|| ''}`
      document.getElementById('feels-like').innerText = `Feels like ${Math.round(data.main.feels_like) + '°' || ''}`
      document.getElementById('condition').innerText = `${data.weather[0].description || ''}`
      document.getElementById('city').innerText = `${(data.name) || ''}`

    })
});