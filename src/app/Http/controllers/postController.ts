import Post from '../../models/Post'

export function index(req, res) {
  Post.find((errors, posts) => {
    if (errors) {
      console.log('Errors occur: ', errors)
      res.status(500).send(errors) // status 500
    } else {
      res.render('posts/index', { title: 'Posts', posts: posts })
    }
  })
}

export function create(req, res) {
  res.render('posts/new', { title: 'New' })
}

export function store(req, res) {
  let post = new Post(req.body)
  post.save((error) => {
    if (error) {
      console.log('Errors occur: ', error)
      res.status(500).send(error) // status 500
      res.redirect('posts/new')
    } else {
      res.redirect('posts')
    }
  })
}

export function edit(req, res) {
  Post.findById(req.params.id, (error, post) => {
    if (error) {
      console.log('Errors occur: ' + error)
      res.status(500).send(error) // status 500
    } else {
      res.render('posts/edit', { title: 'Edit post', post: post })
    }
  })
}

export function update(req, res) {
  Post.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      content: req.body.content
    }
  }, (error, posts) => {
    if (error) {
      console.log('Errors occur: ' + error)
      res.status(500).send(error)
      res.render('posts/edit', { posts: req.body })
    }
    res.redirect('/posts')
  })
}

export function destroy(req, res) {
  Post.remove({ _id: req.params.id }, (error, posts) => {
    if (error) {
      res.status(500).send(error)
    } else {
      res.redirect('posts')
    }
  })
}
