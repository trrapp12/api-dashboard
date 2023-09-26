const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});




// fetch("https://api.unsplash.com/photos/random")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         // document.body.style.backgroundImage = `url(${data.urls.regular})`
//     })