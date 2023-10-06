fetch('http://localhost:5501/getBackground/')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('background-image').setAttribute('src', data[0].urls.full)
    document.getElementById('first-name').innerText = data[0].user.first_name || ''
    document.getElementById('last-name').innerText = data[0].user.last_name || ''
  })

  fetch('http://localhost:5501/getWord')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })