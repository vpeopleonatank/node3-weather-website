const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'tqk'
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location: location.place_name,
        address: req.query.address
      })
    })
  })
})

app.get('/product', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search);
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'tqk',
    errorMessage: 'Page not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'tqk',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})