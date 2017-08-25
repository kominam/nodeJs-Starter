import * as LocalStrategy from 'passport-local'
LocalStrategy.Strategy
import User from '../app/models/User'

export function configure(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    if (email) email = email.toLowerCase()

    User.findOne({ 'email': email }, (err, user) => {
      if (err) return done(err)

      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
      } else {
        let newUser = new User()
        newUser.email    = email
        newUser.password = password

        newUser.save((err) => {
          if (err)
            throw err
          return done(null, newUser)
        })
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {
      if(err) return done(err)

      if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'))

      if (!user.verifyPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))

      return done(null, user)
    })
  }))
}
