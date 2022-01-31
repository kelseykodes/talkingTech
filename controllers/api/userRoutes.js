const router = require('express').Router();
// const { User } = require('../../models');
const session = require('express-session');



router.post('/login', (req, res) => {
    User.findOne({ 
        where: { username: req.body.username } 
    })
    .then (userData => {
        if (!userData) {
            res.status(404).json({ message: 'Incorrect username or password.' });
            return;
          }
          const validPW = userData.checkPassword(req.body.password);
      
          if (!validPW) {
            res.status(400).json({ message: 'Incorrect username or password.' });
            return;
          }
      
          req.session.save(() => {
            req.session.username = userData.username;
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
          });
      
        }).catch (err => {
            res.status(400).json(err);
        });
       
// route for logging user out of site
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(200).end();
      });
    } else {
      res.status(400).end();
    }
  });

// route for user to create log in
router.post('/', (req, res) => {
       User.create({
        username: req.body.username,
        username: req.body.username,
        password: req.body.password
      })
      .then (newUser => {
            req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username
            req.session.logged_in = true;
      
            res.status(200).json(userData);
      });
    })
        .catch (error => {
      res.status(400).json(error);
    });
  });

module.exports = router});