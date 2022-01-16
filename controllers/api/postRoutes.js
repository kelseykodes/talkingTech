const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post',
            'name',
            'creation'
          ],
          include: [
            User,
            {
              model: Comment,
              include: [User],
            },
          ],
    })
    .then(getPost => res.json(getPost))
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        post: req.body.post,
        user_id: req.session.user_id
    })
    .then(newPost => res.json(newPost))
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});


router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id}
        }
    )
    .then(updatePost => {
        if (!updatePost) {
            res.status(404).json({ message: 'inncorect id. cannot find post.' });
            return;
        }
        res.json(updatePost);
    })
    .catch(err => {
        res.status(500).json(err)
        
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletePost => {
        if (!deletePost) {
          res.status(400).json();
          return;
        }
      })
      .catch(err => {
        res.status(500).json(err);
        console.log(err);
      });
  });

module.exports = router;