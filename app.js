const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = 3000
const exphbs = require('express-handlebars')
const urlModel = require('./models/url')
const generateCode = require('./generate_code')

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
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', (req, res) => {
  const original_url = req.body.original_url.toLowerCase().trim()
  let code = generateCode()

  urlModel.findOne({ original_url })
    .lean()
    .then(data => {
      if (!data) {
        urlModel.create({ original_url, code })
      } else {
        code = data.code
      }
    })
    .then(() => res.redirect(`/url/result/${code}`))
    .catch(error => console.log(error))
})

app.get('/url/result/:code', (req, res) => {
  const code = req.params.code
  res.render('result', { PORT , code })
})

app.get('/:code', (req, res) => {
  const code = req.params.code

  urlModel.findOne({ code })
    .lean()
    .then(data => res.redirect(`${data.original_url}`))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`URL shortener is running on http://localhost:${PORT}`)
})
