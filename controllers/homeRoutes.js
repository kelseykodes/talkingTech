const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'name',
      'post',
      'creation'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'user_id', 
          'post_id', 
          'comment'
        ],
        include: {
          model: User,
          attributes: [
            'username',
             'email'
          ]
        }
      }]
    })
    .then(postData => {
      const posts = postData.map(post => 
        post.get({ plain: true })
        );
      res.render('home', {posts,logged_in: req.session.logged_in} 
      //double check login
      );
    })
    .catch(err => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'post',
      'creation'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'user_id', 
          'post_id',
          'comment'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
    ]
  })
    .then(pData => {
      if (!pData) {
        res.status(400).json({ message: 'wrong id. cannot grab post request.' });
        return;
      }
      const post = pData.get({ plain: true });
      res.render({ post, logged_in: req.session.logged_in });
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
});

module.exports = router;