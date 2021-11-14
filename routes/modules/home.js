const express = require('express')
const router = express.Router()
const urlModel = require('../../models/url')

// 首頁
router.get('/', (req, res) => {
  res.render('index')
})

// 重新導向
router.get('/:code', (req, res) => {
  const code = req.params.code

  urlModel.findOne({ code })
    .lean()
    .then(data => res.redirect(`${data.original_url}`))
    .catch(error => {
      console.log(error)
      res.render('error')
    })
})

module.exports = router