const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UrlSchema = new Schema ({
  original_url: {
    type: String,
    required: true
  },
  code: {
    type: String
  }
})

module.exports = mongoose.model('urlModel', UrlSchema)