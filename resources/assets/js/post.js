const axios = require('axios');

$('.delPost').each(function() {
  const post = $(this);
  post.on('click', function() {
    axios.delete('/posts/' + post.data('post-id')).then(function() {
      post.parent().parent().fadeOut();
    }).catch(function(error) {
      console.log(error);
    });
  });
});
