import * as express from 'express'
import * as chalk from 'chalk'
import * as dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'
import * as mongoose from 'mongoose'
import * as passport from 'passport'
import * as methodOverride from 'method-override'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as flash from 'express-flash'

dotenv.load()

const app = express()

mongoose.connect(process.env.MONGODB_URL)

app.set('port', process.env.PORT || 8080)
app.set('view engine', 'pug')
app.set('views', '../src/resources/views/')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(flash())
app.use(logger('dev'))
app.use(express.static('./public'))

app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session())

// router
import * as passportConfig from './config/passport'
import * as routes from './routes/web'
passportConfig.configure(passport)
routes.initialize(app, passport)

app.listen(app.get('port'), () => {
  console.log('%s App is running at port %d in %s env\n',
    chalk.green('✓'),
    app.get('port'),
    app.get('env'))
  console.log('-> Press CTRL-C to stop\n')
})
