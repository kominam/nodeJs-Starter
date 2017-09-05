import * as middleware from '../app/Http/Middleware/middleware'
import * as postController from '../app/Http/controllers/postController'
import * as userController from '../app/Http/controllers/userController'

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

  app.get('/profile', middleware.isAuthenticated, (req, res) => {
    res.render('auth/profile', { title: 'Profile', user: req.user })
  })
  app.post('/profile/avatar', [middleware.isAuthenticated, middleware.uploadAvatar], (req, res, next) => {
    let user = req.user
    user.profile.picture = req.file.path
    user.save((err, user) => {
      if (err) console.log(err)
    })
    res.redirect('back')
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
  app.put('/users/:id', userController.updateProfile)
}
