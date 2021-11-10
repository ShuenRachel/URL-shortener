const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = 3000
const exphbs = require('express-handlebars')
const urlModel = require('./models/url')

mongoose.connect('mongodb://localhost/url-shortener')

db.on('error', () => {
  console.log('Mongodb error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`URL shortener is running on http://localhost:${PORT}`)
})