const express = require('express')
const path = require('path')
const hbs = require('hbs')
const userRoute = require('./routers/user')
const bookRoute = require('./routers/books')


const app = express()

// Express configs
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
// const partialsDir = path.join(__dirname, '../templates/partial')

// Set hbs view
app.set('view engine', 'hbs')
app.set('views', viewsDir)
// hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(userRoute)
app.use(bookRoute)


module.exports = app






