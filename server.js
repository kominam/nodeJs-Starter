require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')

mongoose.connect(process.env.MONGODB_URL)

app.set('port', process.env.PORT || 8080)
app.set('view engine', 'pug')
app.set('views', './resources/views/')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(flash())
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))

app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session())

// router
require('./config/passport')(passport)
require('./routes/web')(app, passport)

app.listen(app.get('port'), function() {
  console.log('%s App is running at port %d in %s env\n',
    chalk.green('✓'),
    app.get('port'),
    app.get('env'))
  console.log('-> Press CTRL-C to stop\n')
})
