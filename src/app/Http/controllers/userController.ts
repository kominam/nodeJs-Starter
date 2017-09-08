import User from '../../models/User'
import * as request from 'express-validator'

export function updateProfile(req, res, next) {
  req.assert('email', 'Please enter a valid email address.').isEmail()
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false })

  const errors = req.validationErrors()

  if (errors) {
    req.flash('errors', errors)
    return res.redirect('/profile')
  }

  User.findById(req.user.id, (error, user) =>{
    if (error) return next(error)

    user.email = req.body.email
    user.profile.name = req.body.name
    user.profile.gender = req.body.gender.toLowerCase()
    user.profile.address = req.body.address
    user.save((err) => {
      if (err) return next(err)
      req.flash('success', { msg: 'Profile information has been updated.' })
      res.redirect('/profile')
    })
  })
}
