import Post from '../../models/Post'

export async function index(req, res) {
  try {
    let posts = await Post.find()
    res.render('posts/index', { title: 'Posts', posts: posts })
  } catch(error) {
    console.log('Errors occur: ', error)
    res.status(500).send(error) // status 500
  }
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

export async function edit(req, res) {
  try {
    let post = await Post.findById(req.params.id)
    res.render('posts/edit', { title: 'Edit post', post: post })
  } catch(error) {
    console.log('Errors occur: ' + error)
    res.status(500).send(error) // status 500
  }
}

export async function update(req, res) {
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      })
    res.redirect('/posts')
  } catch(error) {
    console.log('Errors occur: ' + error)
    res.status(500).send(error)
    res.render('posts/edit', { posts: req.body })
  }
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
