const postController = require('../app/Http/controllers/postController')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Homepage' })
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }))

  app.get('/register', (req, res) => {
    res.render('auth/signup', { title: 'Register', message: req.flash('signupMessage') })
  })

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }))

  app.get('/posts', postController.index)
  app.get('/posts/new', postController.new)
  app.post('/posts', postController.create)
  app.get('/posts/:id/edit', postController.edit)
  app.put('/posts/:id', postController.update)
  app.delete('/posts/:id', postController.destroy)
}
