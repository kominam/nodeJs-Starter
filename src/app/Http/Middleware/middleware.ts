import * as multer from 'multer'

// authorize
export let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

// upload avatar
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './storage/upload/')
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split('/')
    let extension = extArray[extArray.length - 1]
    cb(null, req.user.profile.name + '_' + Date.now() + '.' + extension)
  }
})

export let uploadAvatar = multer({ storage: storage }).single('avatar')
