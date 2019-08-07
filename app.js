const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const menuRoutes = require('./routes/menus')
const contentRoutes = require('./routes/contents')

// CORS
app.use(cors())

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES
app.use('/auth', authRoutes)
app.use('/menus', menuRoutes)
app.use('/contents', contentRoutes)

module.exports = app