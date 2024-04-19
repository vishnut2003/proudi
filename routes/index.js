var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Proudi' });
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

module.exports = router;
