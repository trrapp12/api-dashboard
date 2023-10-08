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

   



See the function below: 

```javascript

  function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }
  
  ```
  
  2) When I created key listeners I found I had to anticipate keys the user might think to hit besides the enter button to prevent them from registering.
  
  See code example below: 
  
  ```javascript
  
  const keyHandler = (evt) => {
    if (evt.key === "Enter") {
      if (player1turn === undefined) {
        console.log(`CLICK EVENT, IF STATEMENT: ${player1turn}`);
        determineWhoRollsFirst();
        displayButtonMessage("Roll!");
      } else {
        console.log(`CLICK EVENT, ELSE STATEMENT: ${player1turn}`);
        playerRolls(player1turn, objArray);
        checkForWinner(player1score, player2score);
        player1turn = !player1turn;
      }
    } else if (
      evt.key === "Tab" ||
      evt.key === "ArrowLeft" ||
      evt.key === "Left" ||
      evt.key === "ArrowUp" ||
      evt.key === "Up" ||
      evt.key === "ArrowRight" ||
      evt.key === "Right" ||
      evt.key === "ArrowDown" ||
      evt.key === "Down" ||
      evt.key === " "
    ) {
      console.log("nothing to see here");
    } else {
      alert("Please use the Enter key make selections");
    }
  };
  
  ```

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

* Character Images created by "Travel Dawn," licensed under Adobe Standard license.

* 'Choose not to be harmed—and you won't feel harmed. Don't feel harmed—and you haven't been.' --original quote by Marcus Aurelius.

* 'Death may be the greatest of all human blessings.' --original quote by Socrates.

* Definition of 'hæland': <a href="https://www.etymonline.com/search?q=haeland">Healer</a>, on <a href="https://www.etymonline.com/">etymonline</a>

* Defintiion of 'ignis fatuus': <a href="https://www.etymonline.com/search?q=ignis%20fatuus&ref=searchbar_searchhint">ignis fatuus</a>, on <a href="https://www.etymonline.com/">etymonline</a>

* Definition of 'Vliecke': <a href="https://www.etymonline.com/search?q=Vliecke">Vliecke</a>, on <a href="https://www.etymonline.com/">etymonline</a>

* Definition of 'Goyathlay': <a href="https://www.britannica.com/biography/Geronimo">Geronimo Apache leader</a>, on <a href="https://www.britannica.com/">Britannica</a>

* Definition of 'feohtende', 'werede', 'ofslægenne' from <a href="https://lrc.la.utexas.edu/eieol/engol/30">Old English Online: Lesson 3, Jonathan Slocum </a>, on <a href="https://liberalarts.utexas.edu/lrc/">Linguistics Research Center: College of Liberal Arts</a>

* Definition of 'התחלה': <a href="https://en.wiktionary.org/wiki/Wiktionary:Main_Page">Wiktionary</a></p>

* Definition of 'anræd': <a href="https://www.st-andrews.ac.uk/~cr30/vocabulary/">Old English Core Vocabulary</a>

* itle font "Angars Ruins" created by <a href="http://www.mansgreback.com/">Mans Greback</a>. Used under non-profit license QF121285258G as this is a public facing site, but with no way nor desire of making a profit.

* File # 396656517, a video of Powerful Female in medieval armor by <a href="https://stock.adobe.com/contributor/205110669/procinemastock?load_type=author&prev_url=detail">procinemastock</a>. Used under Adobe Stock license.

* File # 630909246, a faceless wraith lingers in the air, by <a href="https://stock.adobe.com/contributor/207618192/justlight?load_type=author&prev_url=detail">justlight</a>. Used under Adobe Stock license.

* File # 199937353, realistic dry ice smoke, by <a href="https://stock.adobe.com/contributor/206637170/mputsylo?load_type=author&prev_url=detail">myputsylo</a>. Used under Adobe Stock license.

* UIcons by <a href="https://www.flaticon.com/uicons">Flaticon</a>

---

### YOU CAN FIND ME AT:

*For more information see my [LinkedIn](https://www.linkedin.com/in/trevor-rapp-042a1037) or return to my [Github](https://github.com/trrapp12)*

