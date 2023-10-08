# api-dashboard
 
 ---

<br>


<br>

[![Button60](https://user-images.githubusercontent.com/11747875/144651679-dc423f76-a98a-456d-8ca2-d913f0b7df12.png)](https://trrapp12.github.io/Product-Page/)

<br>
<br>


---

<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
<img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />
<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<br>
<br>

---

### Description:

>Her Feet upon the Dashboard
>is her feeling of Freedom
>

― Magie

This is a project focused on learning API calls that I did as part of the [Scrimba Front-End Developer Career Path](https://scrimba.com/learn/frontend).  It takes the format of a chrome extension which upon opening a new tab makes an organizational dashboard.  It includes API calls to unsplash for the background, 
navigator to get latitude and longitude, the OpenWeatherMap API for the current weather conditions, and it also gets the current time and has a hidden pomodorro timer for those who look 😉😉😉.

---

### QUICKSTART GUIDE: 

Click on the "View Project" button above ⬆️

---

### Project demonstrates the following:

- [X] API calls
    
- [X] fetch

- [X] promise chaining with .then()
    
- [X] async/await
    
- [X] parsing responses

---

### CHALLENGES I OVERCAME...

1) While the course was great way to learn the theory of

   * http requests
   * URLs and endpoints
   * Body
   * Header
   * Resources
   * Parameters
   * Queries
   * Callbacks
   * .filter()
   * Promises
   * .then() chaining

  The hands-on didn't seem to extend past this pattern:

   ``` fetch('https://api.url.com/endpoint?arg1='true'&&arg2='false')
           .then(response => response.json())
           .then(data => {
           //do something with the data
   }
   ```

This really left me at a deficit when I went to create my own project, because I had to figure out a few things on my own, like:

1) Well, if you are using an API key, you need to keep it secret, therefore ...
* If you are keeping it secret, it needs to be in a .env file
* That .env file has a certain syntax
* that .env file has to be root directory
2) If you have a secret API key you can't push it up to the CDN, therefore ...
* you have to make a .gitignore file
* the .gitignore file needs to include the following lines:

   ```
   # dotenv environment variable files
  .env
  .env.development.local
  .env.test.local
  .env.production.local
  .env.local
  ```
* if you have already pushed said files to github you can't just delete them, you have to do the following:

  ```
  git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-PRIVATE-KEY" \
  --prune-empty --tag-name-filter cat -- --all
  ```
  because deleting the file just removes the latest file, it doesn't remove the reference from previous commits where people could scrape your repo to find them.  This command rewrites your Git repository's history by applying a filter that removes the specified file from every commit.  Replace PATH-TO-YOUR-FILE-WITH-PRIVATE-KEY with the path to your file.

  Then you will have to push your changes, but because you're probably working with a remote repository a normal push won't do, so you'll have to use

  ```
  git push origin --force --all
  ```

  You'll be lucky if it's just your own repository, because then you don't have to worry about collaborators.  But if you do you will need to do a rebase, so you'll have to use

  ```
  git fetch
  git rebase origin/<branch_name>
  ```

* At this point if you haven't lost it, kudos, because I was losing it.  Now you can have a private API key that exists in your github repo and your local computer just fine.  But since I want to publish this where it could be seen as a portfolio project I had to figure out the next thing.  How do I make the fetch call without passing my API key on the client side where someone could just capture it in the console?

* So I had to figure out how to set up a backend service
  1) installing node
  2) installing npm
  3) find out what libraries I needed (it turned out Express.js for the HTTP requests, Axios for external API requests, and dotenv to read my .env file)  But wait, I would find out later when troubleshooting a cors error that I needed to import "cors"
 
* But then I had never set up a server before, so I had to figure out the syntax for that.  Then I had to wrap my head around why I was making api calls to my own files. * It makes sense now that the server.js file AKA as the server side makes the actual API call and so needs to have the API key.  So we had to put it in a server out of the reach of anyone else so that key could live there.  The API requests I was used to making directly to unSplash in my code had to be directed to the server I built, which then make the call for me and passed the information back to my original request. *

* My server logic looked like this:

  ```
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

* which reminds me of a few other things I had to learn:
1) now that you are using a Node.js file, you name your index.js file with a .js extension.  You have to change it to .mjs.  
2) your index.html will now also throw an error unless you make your ```<script src="index.js"></script>``` look like this:  ```<script type="module" src="index.js"></script>```
3) then, since I had an API call to a weather API that needed my latitude and longitude to make the call before it could come back with a response, I had to figure out where that needed to be done.  This one got tricky.  Working backwards I knew that my API request had to have the lat and long already figured out so I could put them in as parameters in either the header or the URL.  I knew I could get those from navigator API on the Window object.  So I know how to get it, and that it has to be ready to be passed into server.js.  But server.js doesn't kick off the process, because the first call has to be made from my index.js file.  Remember server.js is middleware, index.js is client side.  So if server.js needs info, it has to be passed UP to it from the index.js.  But how?  They aren't connected like my files.  I can't just do an import statement from one file to the next?  This really took a while to wrap my head around.  After a few hours of research it became clear I could use the fetch URL to pass them up.  So I created a function that would do all the logic to pull the lat and long from the navigator API.  But then what?  I have two values and one function.  I don't want to make global variables and I can't have 2 return values in one function.  So I have to expand my function that did all my navigator logic so it could take a callback function.  And what would I use for that callback function?  My fetch request.  Now since my callback function is getting called in the same scope it would have access to both the lat and long and then it would simultaneously make the API request to the server.js passing them up so that the server.js request could then use them as it's own parameters.
4) Also, how to add parameters in headers, not just passing them in the url
5) Running your server behind a VPN will likely get it blocked
6) You have to use ```process.env.VARIABLE``` is how you pull up a variable from the .env file
7) When you form your headers you need to use:

   ```
   headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    }
   ```

   not

   ```
   headers: {
        Authorization: Client-ID UNSPLASH_API_KEY,
    }
   ```

8) In the .env file you don't put strings around the keys or values.  So it would look like ```API_KEY=ALPANUMERICKEY1234```
9) The front-end server and backend server have to be on different ports
10) You will spend a lot of time trying to figure out why you are getting a blank screen with no console errors and then you'll realize you need run ```npm run dev```.  You mean the server actually has to be running for any of this to work?  Ughh... Always the simple stuff.
11) BUT...you can make multiple API calls from the same port.  Like the apartment building metaphor.  My servers are two different apartment buildings.  One is client side, one is server side.  Each apartment has it's own building number (i.e. port 5500 and port 5501).  In each apartment building they have different apartments which have different numbers.  Those are the API numbers.
12) If things are not working right sometimes a quick manual test (typing in the API call as you think it should be formulated into the browser and seeing what it gets) is quicker than 60 console.logs.
13) And then sometimes the problem is you actually are doing something right and it's the unclear documentation that make you think you're calling the freemium API when you actually still need to subscribe.
14) When you deploy to your chrome extension you're going to see it work beautifully "in Production" until you turn your computer off and then it doesn't work again and you'll scratch your head until you realize you didn't change the fetch request of ```fetch('http://localhost:5500/getBackground')``` to the deployed server so every time you get on you will either have to open VS Code and run the server or replace ```localhost:5500``` with the address of the actual server in prod.



---

### MY OWN PERSONAL CONTRIBUTIONS INCLUDED 

- [X] Use JavaScript classes to create multiple players, multiple characters, and multiple spells that can be generated in random order.  
      
- [X] Use of Fisher-Yates shuffle algorithm for a truely random distribution in my array sorting.

- [X] A visually impressive health bar that both progress/decline and updates dynamically and in conjunction with the player status.


      
- [X] More play options (defend dice), and casting spells
      
- [X] I added the capability to detect when multiples of the same dice were rolled, detected which dice they belonged to, and differentiating if between multiples of multiples (i.e. pair of 3's and 3 5's rolled)
      
- [X] use of .replace()
      
- [X] use of powers ``` ** ```
      
- [X] use of Number()
      
- [X] use of Set to detect duplicates
      
- [X] use of .sort()
      
- [X] use of .shift()

---

### ATTRIBUTIONS

* Icons from [Orion Icon Library](orioniconlibrary.com).

* This project was inspired by the [Personal Dashboard](https://scrimba.com/learn/frontend/section-intro-co474451c9456715dcac4b188) project from the [Scrimba Front-End Developer Career Path](https://scrimba.com/learn/frontend).  The majority of the work is consistent with what was presented in the original project, with additiions and variations noted in the personal contributions section.

---

### YOU CAN FIND ME AT:

*For more information see my [LinkedIn](https://www.linkedin.com/in/trevor-rapp-042a1037) or return to my [Github](https://github.com/trrapp12)*

