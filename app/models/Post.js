require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)

const Schema = mongoose.Schema

var postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: Text,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// getAll
postSchema.methods.all = (callback) => ({
  return this.find({}, callback)
})

// find one
postSchema.methods.get = (id, callback) => ({
  return this.findByID(id, callback)
})

// create one
postSchema.methods.create = (req, callback) => ({
  let post_params = new Post({
    title: req.body.title,
    content: req.body.content
  })

  return post_params.save(callback)
})

// update one
postSchema.methods.update = (id, req, callback) => ({
  return this.update(id, {
    $set: {
      title: req.body.title,
      content: req.body.content
    }
  }, callback)
})

// delete one
postSchema.methods.destroy = (id, callback) => ({
  return this.findOneAndRemove(id, callback)
})

var Post = mongoose.model('Post', postSchema)

module.exports = Post
