function getLocation(callback) {
    console.log('inside getLocation')
    let lat;
    let lon;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              lat = position.coords.latitude;
              lon = position.coords.longitude;
              callback(lat, lon);  // Pass lat and lon to the callback
          });
      } else {
          console.error('Geolocation is not supported by this browser.');
      }
  }


  export { getLocation }