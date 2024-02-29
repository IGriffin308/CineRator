CineRator

Source code for a social platform where users can search for movies, and rate and comment on them.
(This is a funcitonal mockup. This site is not currently live hosted)

Install instructions to run locally:

1. In Client directory, run "npm install" or "yarn install" to install front-end React dependencies.
2. In Server directory, run "npm install" or "yarn install" to install back-end NodeJS dependencies.
3. In Server directory, run "psql < cinerator.sql" to make the database in Postgres.
4. Go to https://www.omdbapi.com/apikey.aspx to register an api key
5. Store the api key in the backend. There are two available ways to do this.
   a. Create a file name api-key.js in the server directory. This file should have the following contents:
   ```
    const API_KEY = "you api key here"
    module.exports = API_KEY;
   ```
   b. OR you can store you api key in a process.env file in the server directroy.
      If you do this, you will need to switch lines 15 and 16 in server/models/omdb.js

6. run "npm start" in both the server and client directories. 
   By default, the server runs on localhost port 5000, and the client on port 3000. 
   These ports can be changed by declaring PORT in a process.env file in each of the two directories.
   If you run the server anywhere other than localhost:5000, you will need to change BASE_URL on line 3 of client/src/api/api.js
