const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`URL shortener is running on http://localhost:${PORT}`)
})
