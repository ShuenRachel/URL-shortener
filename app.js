const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = 3000

mongoose.connect('mongodb://localhost/url-shortener')

db.on('error', () => {
  console.log('Mongodb error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('<h1>This is for URL shortener project</h1>')
})

app.listen(PORT, () => {
  console.log(`URL shortener is running on http://localhost:${PORT}`)
})