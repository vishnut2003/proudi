var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frontend/home');
});

router.get('/register', (req, res) => {
  res.render('frontend/register', {
    registerError: false,
    errorMessage: null
  });
})

router.post('/register', (req, res) => {
  userHelpers.doRegister(req.body)
    .then(() => {
      res.send('Registration success')
    })
    .catch( message => {
      res.render('frontend/register', {
        registerError: true,
        errorMessage: message
      })
    })
})

router.get('/login', (req, res) => {
  res.render('frontend/login', {
    loginError: false,
    errorMessage: null
  })
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body)
    .then(() => {
      res.send('Login Done')
    })
    .catch((err) => {
      res.render('frontend/login', {
        loginError: true,
        errorMessage: err
      })
    })
})

module.exports = router;
