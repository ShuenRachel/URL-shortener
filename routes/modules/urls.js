const express = require('express')
const router = express.Router()
const urlModel = require('../../models/url')
const PORT = 3000
const generateCode = require('../../utils/generate_code')

router.post('/', (req, res) => {
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

router.get('/result/:code', (req, res) => {
  const code = req.params.code
  res.render('result', { PORT, code })
})

module.exports = router