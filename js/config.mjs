// since lat and lon are two separate variables that both need to be returned, getLocation then needs to be able to receive a callback function which 
// will serve to make the API call, thus giving the API call access to the scope of it's parent function and thus lat and lon

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