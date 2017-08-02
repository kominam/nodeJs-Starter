// const express = require('express')
// const router = express.Router()
const postController = require('../app/Http/controllers/postController')

// router.get('/posts', postController.index)
// router.get('/posts/new', postController.new)
// router.post('/posts', postController.create)
// router.get('/posts/:id/edit', postController.edit)
// router.put('/posts/:id', postController.update)
// router.delete('/posts/:id', postController.destroy)

// module.exports = router

module.exports = (app) => {
  app.get('/posts', postController.index)
  app.get('/posts/new', postController.new)
}
