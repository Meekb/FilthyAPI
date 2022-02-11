const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const http = require('http')

const app = express()

const articles = [
  {
    name: 'nytimes',
    address: 'https://www.nytimes.com/topic/person/john-waters',
    base: 'https://www.nytimes.com'
  },
  {
    name: 'townandcountry',
    address: 'https://www.townandcountrymag.com/search/?q=john+waters',
    base: 'https://www.townandcountrymag.com'
  },
  {
    name: 'them',
    address: 'https://www.them.us/search?q=JOHN+WATERS&sort=score+desc',
    base: 'https://www.them.us'
  }
]

const media = []

app.get('/', (req, res) =>  {
  res.json('Welcome to the King of Filth API!')
})

articles.forEach(site => {
  axios.get(site.address)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)

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


app.get('/articles', (req, res) => {
  res.json(media)
})

app.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId
  const articleAddress = articles.filter(article => article.name == articleId)[0].address
  
  const articleBase = articles.filter(article => article.name == articleId)[0].base

  axios.get(articleAddress)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      const specificArticles = []
      $('a:contains("John Waters")', html).each(function() {
        const title = $(this).text()
        const url = $(this).attr('href')
        specificArticles.push({
          title,
          url: articleBase + url,
          source: articleId
        })
      })
      res.json(specificArticles)
    }).catch(err => console.log(err))

})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
