import rateLimit from 'express-rate-limit';
import express from 'express';
import axios from 'axios';
// import https from 'https'; // Uncomment if needed
import cors from 'cors';
import { getLocation } from './config.mjs';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(cors());

const port = process.env.PORT || 5501;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


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


app.get('/getWeather/', async (req, res) => {
    // openweathermap api
    console.log('getWeatherAPI route called')
    const lat = req.query.lat;  // Get lat from the query parameters
    const lon = req.query.lon;  
    console.log('inside server.js > app.get, lat and lon are', lat, lon)

    if (!lat || !lon) {
        return res.status(400).send('Latitude and Longitude are required.');
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?`, {
            params: {
                lat: lat,
                lon: lon,
                appid: process.env.OPEN_WEATHER_API_KEY, 
                units: 'imperial',
                exclude: 'minutely,hourly,daily'
            }
        })
        console.log('inside server.js, weatherAPI response is', response)
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// Define rate limit middleware
const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 50,
  message: 'You have exceeded the 50 requests in 24 hours limit!',
  headers: true,
});

// Apply rate limit middleware to specific routes
app.use('/getWeather/', apiLimiter);
