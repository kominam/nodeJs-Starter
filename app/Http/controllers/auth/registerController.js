exports.showRegisterForm = (req, res) => {
  res.render('auth/signup', { title: 'Register' })
}

exports.register = (passport) => {
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  })
}
