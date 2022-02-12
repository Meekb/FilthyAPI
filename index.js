const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = [
  {
    name: 'nytimes',
    address: 'https://www.nytimes.com/topic/person/john-waters',
    base: 'https://www.nytimes.com'
  },
  {
    name: 'outmagazine',
    address: 'https://www.out.com/search/site/john%20waters',
    base: ''
  },
  {
    name: 'theadvocate',
    address: 'https://www.advocate.com/search/site/john%20waters',
    base: ''
  },
  {
    name: 'gomagazine',
    address: 'http://gomag.com/?s=john+waters',
    base: ''
  },
  {
    name: 'baltimoremagazine',
    address: 'https://www.baltimoremagazine.com/?s=john+waters',
  },
  {
    name: 'indiewire',
    address: 'https://www.indiewire.com/results/#?q=john%20waters',
    base: 'https://www.indiewire.com'
  },
  {
    name: 'them',
    address: 'https://www.them.us/search?q=JOHN+WATERS&sort=score+desc',
    base: 'https://www.them.us'
  },
  {
    name: 'dazed',
    address: 'https://www.dazeddigital.com/tag/john-waters',
    base: 'https://www.dazeddigital.com'
  },
  {
    name: 'baltimorefishbowl',
    address: 'https://baltimorefishbowl.com/?s=john+waters',
    base: ''
  },
  {
    name: 'theguardian',
    address: 'https://www.theguardian.com/film/john-waters',
    base: ''
  },
  {
    name: 'entertainmentweekly',
    address: 'https://ew.com/search/?q=john+waters',
    base: ''
  },
  {
    name: 'tvguide',
    address: 'https://www.tvguide.com/s/john-waters/',
    base: 'https://www.tvguide.com'
  },
  {
    name: 'hightimes',
    address: 'https://hightimes.com/?s=john+waters',
    base: ''
  },
  {
    name: 'monocle',
    address: 'https://monocle.com/search/?keywords=john%20waters',
    base: ''
  },
  {
    name: 'juxtapoz',
    address: 'https://www.juxtapoz.com/search/john%20waters/',
    base: 'https://www.juxtapoz.com'
  },
  {
    name: 'people',
    address: 'https://people.com/search/?q=john+waters',
    base: ''
  },
  {
    name: 'instyle',
    address: 'https://www.instyle.com/search?q=john+waters',
    base: ''
  },
  {
    name: 'closer',
    address: 'https://www.closerweekly.com/search-results/?_s=john+waters',
    base: ''
  },
  {
    name: 'travel+leisure',
    address: 'https://www.travelandleisure.com/search/?q=john%20waters',
    base: ''
  }
]

const media = []

app.get('/', (req, res) =>  {
  res.json('Welcome to the King of Filth API!')
})

// get all articles
articles.forEach(site => {
  axios.get(site.address)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)

      $('a:contains("<em>John Waters</em>")', html).each(function() {
        const title = $(this).text().replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
        const url = $(this).attr('href')
        if (title !== "" && title !== "_" && title !== 'acontains' && !title.includes('discount') && !title.includes('Accessories') && !title.includes('mediamax-width') && url) {
          media.push({
            title,
            url: site.base ? site.base + url : url,
            source: site.name
          })
        }
      })
       
      $('a:contains("John Waters")', html).each(function() {
        const title = $(this).text().replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
        const url = $(this).attr('href')
        if (title !== "" && title !== "_" && title !== 'acontains' && !title.includes('discount') && url && title.length < 300 && url.length < 300) {
          media.push({
            title,
            url: site.base ? site.base + url : url,
            source: site.name
          })
        }
      })
    })
})


app.get('/articles', (req, res) => {
  res.json(media)
})

// get articles by specific source
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
