const postController = require('../app/Http/controllers/postController')

module.exports = (app) => {
  app.get('/posts', postController.index)
  app.get('/posts/new', postController.new)
  app.post('/posts', postController.create)
  app.get('/posts/:id/edit', postController.edit)
  app.put('/posts/:id', postController.update)
  app.delete('/posts/:id', postController.destroy)
}
