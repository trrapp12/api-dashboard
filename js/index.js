


// fetch("https://api.unsplash.com/photos/random")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         // document.body.style.backgroundImage = `url(${data.urls.regular})`
//     })

fetch('http://localhost:5500/getBackground')
  .then(response => response.json())
  .then(data => console.log(data))