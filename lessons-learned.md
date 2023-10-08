
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
   
   
1) now that you are using a Node.js file, you name your index.js file with a .js extension.  You have to change it to .mjs.  
2) your index.html will now also throw an error unless you make your ```<script src="index.js"></script>``` look like this:  ```<script type="module" src="index.js"></script>```
3) then, since I had an API call to a weather API that needed my latitude and longitude to make the call before it could come back with a response, I had to figure out where that needed to be done.  This one got tricky.  I couldn't use any logic in the server side code, because the navigator object is provided as an API in the browser.  So it HAS to either be hard coded or obtained first on the client-side and then pushed up to the server.  But how?  They aren't connected like files in my previous projects.  I can't just do an import statement from one file to the next?  This really took a while to wrap my head around.  After a few hours of research it became clear I could use the fetch URL to pass them up.  So I created a function that would do all the logic to pull the lat and long from the navigator API.  But then what?  I have two values and one function.  I don't want to make global variables and I can't have 2 return values in one function.  So I have to expand my function that did all my navigator logic so it could take a callback function.  And what would I use for that callback function?  My fetch request.  Now since my callback function is getting called in the same scope it would have access to both the lat and long and then it would simultaneously make the API request to the server.js passing them up so that the server.js request could then use them as it's own parameters.
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
12) And then sometimes the problem is you actually are doing something right and it's the unclear documentation that make you think you're calling the freemium API when you actually still need to subscribe.
13) If things are not working right sometimes a quick manual test (typing in the API call as you think it should be formulated into the browser and seeing what it gets) is quicker than 60 console.logs.
14) When you deploy to your chrome extension you're going to see it work beautifully "in Production" until you turn your computer off and then it doesn't work again and you'll scratch your head until you realize you didn't change the fetch request of ```fetch('http://localhost:5500/getBackground')``` to the deployed server so every time you get on you will either have to open VS Code and run the server or replace ```localhost:5500``` with the address of the actual server in prod.

