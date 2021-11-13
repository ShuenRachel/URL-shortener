const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const urls = require('./modules/urls')

// routing here
router.use('/', home)
router.use('/url', urls)

module.exports = router
