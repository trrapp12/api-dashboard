const express = require('express');
const axios = require('axios');
// const https = require('https');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const port = process.env.PORT || 5501;

// const agent = new https.Agent({  
//     rejectUnauthorized: false
// });

app.get('/getBackground/', async (req, res) => {
    // unsplash api
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random?content_filter=high&orientation=landscape&count=1', {
        // `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&content_filter=high&orientation=landscape`     
        headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
            },
            // httpsAgent: agent 
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
// app.get('/getNotes', async (req, res) => {
//     try {
//         const response = await axios.get('YOUR_API_URL', {
//             headers: {
//                 Authorization' : `Bearer ${process.env.API_KEY}`
//         }
//     });
//         res.send(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// });


// app.get('/getWeather/:lat/:lon', async (req, res) => {
//     // openweathermap api
//     try {
//         const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
//             params: {
//                 lat: req.params.lat,
//                 lon: req.params.lon,
//                 appid: process.env.OPENWEATHERMAP_ACCESS_KEY,
//                 units: 'metric'
//             }
//         })
//         res.send(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// });

// app.get('/getWord', async (req, res) => {
//     // OED api
//     try {
//         const response = await axios.get('https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/ace', {
//             headers: {
//                 'app_id': process.env.OED_APP_ID,
//                 'app_key': process.env.OED_APP_KEY
//             }
//         })
//         res.send(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error)
//     }
// });

app.listen(port, () => console.log(`Listening on port ${port}`));