const Post = require('../../models/Post')

// module.exports = () => {
//   var post = {}

  exports.index = (req, res) => {
    Post.find(function(errors, posts) {
      if (errors) {
        log('Errors occur: ', errors)
        res.status(500).send(errors) // status 500
      } else {
        res.render('posts/index', { posts: posts })
      }
    })
  }

  exports.new = (req, res) => {
    res.render('posts/new')
  }

  exports.create = (req, res) => {
    let post = new Post(req.body)
    post.save((error) => {
      if (error) {
        log('Errors occur: ', error)
        res.status(500).send(error) // status 500
        res.redirect('posts/new')
      } else {
        res.redirect('posts/' + post._id)
      }
    })
  }

  exports.edit = (req, res) => {
    Post.findOne(req.params.id, function(error, posts) {
      if (error) {
        log('Errors occur: ' + error)
        res.status(500).send(error) // status 500
      } else {
        res.render('posts/edit', { posts: posts })
      }
    })
  }

  exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        content: req.body.content
      }
    }, (error, posts) => {
      if (error) {
        log('Errors occur: ' + error)
        res.status(500).send(error)
        res.render('posts/edit', { posts: req.body })
      }
      res.redirect('posts/' + post._id)
    })
  }

  exports.destroy = (req, res) => {
    Post.remove({ _id: req.params.id }, function(error, posts) {
      if (error) {
        res.status(500).send(error)
      } else {
        res.redirect('posts')
      }
    })
  }

//   return post
// }
