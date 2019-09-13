var express = require('express');
var router = express.Router();

var authorization = require('./../utils/auth');

// GET http://localhost:3000/users/login
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

// GET http://localhost:3000/users/register
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

// POST http://localhost:3000/users/login
router.post('/login', function(req, res, next) {
    // get user data from form
    var userName = req.body.userName;
    var password = req.body.password;
    if (authorization.auth.authorize(userName, password)) {
        res.statusCode = 200;
    } else {
        res.statusCode = 403;
    }
    res.end();
});

// POST http://localhost:3000/users/register
router.post('/register', function(req, res, next) {
  var userName = req.body.userName;
  var email = req.body.email;
  var password = req.body.password;

  var user = users.insertUser(userName, email, password)
  
  if (user){
    res.statusCode = 200;
  }else {
    res.statusCode = 403;
  }
    res.end();
});

module.exports = router;