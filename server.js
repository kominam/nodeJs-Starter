require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)
// const posts = require('./routes/web')

app.set('port', process.env.PORT || 8080)
app.set('view engine', 'pug')
app.set('views', './app/views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
// app.use('/posts', posts)

// router
require('./routes/web')(app)

app.listen(app.get('port'), function() {
  console.log('%s App is running at port %d in %s env\n',
    chalk.green('✓'),
    app.get('port'),
    app.get('env'))
  console.log('-> Press CTRL-C to stop\n')
})

app.get('/', (req, res) => {
  res.send('It\'s ok now')
})
