const router = require('express').Router();
const withAuth = require('../utils/auth')
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');



router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'name',
        'post',
        'creation',
      ],
      include: [
        {
          model: Comment,
          attributes: [
          'id', 
          'comment', 
          'post_id', 
          'user_id', 
          'creation'
        ],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, logged_in: true });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'post',
      'creation',
    ],
    include: [
      {
        model: Comment,
        attributes: [
            'id', 
            'comment', 
            'user_id', 
            'post_id', 
            'creation'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(pData => {
      if (!pData) {
        res.status(404).json({ message: 'invailid id.' });
        return;
      }
      const post = pData.get({ plain: true });
      res.render('edit-post', { post, logged_in: true });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
