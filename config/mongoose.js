const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/url-shortener')

db.on('error', () => {
  console.log('Mongodb error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

module.exports = db