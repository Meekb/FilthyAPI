# FilthyAPI
A collection of articles by and about cult filmmaker and King of Filth, John Waters

Built with the help of developer GODDESS [Ania Kubow](https://github.com/kubowania) 
  * YouTube walkthrough (https://youtu.be/GK4Pl-GmPHk)

## Overview
Using Node.js and Express, this basic API uses the npm package [cheerio](https://www.npmjs.com/package/cheerio) to scrape several websites for ```<a>``` 
tags that contain "John Waters": 
  * [The New York Times](https://www.nytimes.com/)
  * [IndieWire](https://www.indiewire.com/)
  * [them.](https://www.them.us/)
  * [Town and Country](https://www.townandcountrymag.com/)  
  
## Instructions
  1. Clone this project
  2. ```cd``` into the project from your terminal
  3. ```npm i``` to install dependencies
  4. ```npm start``` to run localhost
  
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
       // looking for anchor tags that contain "John Waters" within emphasis tags
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

## Learning
This was just a quick tu
 
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

## Endpoints
API home: (https://john-waters-api.herokuapp.com/)

Articles: (https://john-waters-api.herokuapp.com/articles)

Articles from specifies source: https://john-waters-api.herokuapp.com/articles/${source_name}
 - (https://john-waters-api.herokuapp.com/articles/nytimes)
 - (https://john-waters-api.herokuapp.com/articles/indiewire)
 - (https://john-waters-api.herokuapp.com/articles/them)
 - (https://john-waters-api.herokuapp.com/articles/townandcountry)

## Deployed on Heroku
[King of Filth API](https://john-waters-api.herokuapp.com/)

## Contributors
<table>
  <tr>
   <td> Beth Meeker <a href="https://github.com/meekb">GH</td>
  </tr>
  </tr>
    <td><img src="https://avatars.githubusercontent.com/u/76264735?v=4" alt="Beth Meeker avatar"
    width="150" height="auto" /></td>
  </tr>
</table>
