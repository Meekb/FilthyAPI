# FilthyAPI
A collection of articles about cult filmmaker and King of Filth, John Waters

## Overview
Using Node.js and Express, this basic API uses the npm package [cheerio](https://www.npmjs.com/package/cheerio) to scrape several websites for ```<a>``` 
tags that contain "John Waters":
  * [The Advocate](https://www.advocate.com/)
  * [Baltimore Magazine](https://www.baltimoremagazine.com/)
  * [Baltimore Sun](https://www.baltimoresun.com/)
  * [GO Magazine](http://gomag.com/)
  * [IndieWire](https://www.indiewire.com/)
  * [The New York Times](https://www.nytimes.com/)
  * [Out](https://www.out.com/)
  * [them.](https://www.them.us/)
  
## Instructions
  1. Clone this project
  2. ```cd``` into the project from your terminal
  3. ```npm i``` to install dependencies
  4. ```npm start``` to start local server
  5. Open browser to ```localhost:8000```
  
```node
//Here, we run through our articles array and forEach site, we establish a cheerio variable and scrape
// the site for a couple of variations of "John Waters" contained within the anchor tags 
articles.forEach(site => {
  axios.get(site.address)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)

        // looking for anchor tags that contain "John Waters" within emphasis tags
      $('a:contains("<em>John Waters</em>")', html).each(function() {
        const title = $(this).text().replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
        const url = $(this).attr('href')
        media.push({
          title,
          url: site.address,
          source: site.name
        })
      })
       // looking for anchor tags that contain "John Waters"
      $('a:contains("John Waters")', html).each(function() {
        const title = $(this).text().replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
        const url = $(this).attr('href')
        media.push({
          title,
          url: site.address,
          source: site.name
        })
      })
    })
})
```
## Endpoint Code Snippets
- GET all articles
```node
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://filthyapi.p.rapidapi.com/articles',
  headers: {
    'x-rapidapi-host': 'filthyapi.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
```

- GET article by specific source
```node
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://filthyapi.p.rapidapi.com/articles',
  headers: {
    'x-rapidapi-host': 'filthyapi.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
```

## Project Deployed on Heroku
[King of Filth API](https://john-waters-api.herokuapp.com/)

## API 
[RapidAPI](https://rapidapi.com/bethm.meeker/api/filthyapi/)

## Tech Stack
<table>
  <tr>
    <td>Node.js</td>
    <td>Express</td>
    <td>npm</td>
    <td>Axios</td>
    <td>Heroku</td>
  </tr>
  <tr>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/nodejs.svg"/></td> 
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/express.svg"/></td>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/npm.svg"/></td>  
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/axios.svg"/></td>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/heroku.svg"/></td>
  </tr>
</table>

## Contributors
Built with the help of developer GODDESS [Ania Kubow](https://github.com/kubowania) 
  * YouTube walkthrough (https://youtu.be/GK4Pl-GmPHk)

<table>
  <tr>
   <td> Beth Meeker <a href="https://github.com/meekb">GH</td>
  </tr>
  </tr>
    <td><img src="https://avatars.githubusercontent.com/u/76264735?v=4" alt="Beth Meeker avatar"
    width="150" height="auto" /></td>
  </tr>
</table>
