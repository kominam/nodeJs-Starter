import * as postController from '../app/Http/controllers/postController'
import * as middleware from '../app/Http/Middleware/middleware'

export function initialize(app, passport): void {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Homepage' })
  })

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }))

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/register', (req, res) => {
    res.render('auth/signup', { title: 'Register', message: req.flash('signupMessage') })
  })

  app.get('/profile', (req, res) => {
    res.render('auth/profile', { title: 'Profile', user: req.user })
  })

  app.post('/register', passport.authenticate('register', {
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
