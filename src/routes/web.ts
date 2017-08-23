import * as postController from '../app/Http/controllers/postController'

export function initialize(app, passport): void {
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
  app.get('/posts/new', postController.create)
  app.post('/posts', postController.store)
  app.get('/posts/:id/edit', postController.edit)
  app.put('/posts/:id', postController.update)
  app.delete('/posts/:id', postController.destroy)
}
