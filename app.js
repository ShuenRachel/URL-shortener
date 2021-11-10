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
  const code = generateCode()

  console.log(`URL: ${original_url}, code: ${code}`)

  return urlModel.create({ original_url, code })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  // return urlModel.findOne({ original_url: original_url })
  //   .lean()
  //   .then(data => console.log('result:' , data))
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
  
  // urlModel.exists({ original_url: original_url }, function (err, result) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(result)
  //   }
  //   res.redirect('/')
  // })
})

app.listen(PORT, () => {
  console.log(`URL shortener is running on http://localhost:${PORT}`)
})