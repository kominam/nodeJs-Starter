const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    validate: {
      validator: function(mail) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail)
      }
    },
    required: true,
    unique: true
  },
  password: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

userSchema.pre('save', (next) => {
  let user = this

  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err)

      user.password = password
      next()
    })
  })
})

userSchema.methods.verifyPassword = (password) => {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
