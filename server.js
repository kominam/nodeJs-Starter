require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const app = express()
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 8080)

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
