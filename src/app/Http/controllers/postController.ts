import Post from '../../models/Post';
import log from '../../logger/log';

export async function index(req, res) {
  try {
    const posts = await Post.find();
    res.render('posts/index', { posts, title: 'Posts' });
  } catch (error) {
    log.error(error);
    res.status(500).send(error); // status 500
  }
}

export function create(req, res) {
  res.render('posts/new', { title: 'New' });
}

export function store(req, res) {
  const post = new Post(req.body);
  post.save((error) => {
    if (error) {
      log.error(error);
      res.status(500).send(error); // status 500
      res.redirect('posts/new');
    }
    res.redirect('posts');
  });
}

export async function edit(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.render('posts/edit', { post, title: 'Edit post' });
  } catch (error) {
    log.error(error);
    res.status(500).send(error); // status 500
  }
}

export async function update(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        content: req.body.content
      }
    });
    res.redirect('/posts');
  } catch (error) {
    log.error(error);
    res.status(500).send(error);
    res.render('posts/edit', { posts: req.body });
  }
}

export async function destroy(req, res) {
  try {
    const isDeleted = await Post.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({
      isDelete: 'done'
    });
  } catch (error) {
    log.error(error);
    res.status(500).send(error);
  }
}
