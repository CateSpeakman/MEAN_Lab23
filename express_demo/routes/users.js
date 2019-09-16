var express = require('express');
var router = express.Router();
const fs = require('fs');



var authorization = require('./../utils/auth');

// GET http://localhost:3000/users/login
router.get('/login', function (req, res, next) {
  res.render('login');
});

// GET http://localhost:3000/users/register
router.get('/register', function (req, res, next) {
  res.render('register');
});

// POST http://localhost:3000/users/login
router.post('/login', function (req, res, next) {
  // get user data from form
  var userName = req.body.userName;
  var password = req.body.password;
  var users = getUsers();
  if (authorization.auth.authorize(userName, password, users)) {
    req.session.username = userName;
    res.statusCode = 200;
  } else {
    req.session.username = null;
    res.statusCode = 403;
  }

  res.end();
});

// POST http://localhost:3000/users/register
router.post('/register', function (req, res, next) {
  var userName = req.body.userName;
  var password = req.body.password;
  var email = req.body.email;


  var user = insertUser(userName, password, email);

  if (user) {
    res.statusCode = 200;
  } else {
    res.statusCode = 403;
  }
  res.end();
});


// read persisted data from file
var getUsers = () => {
  try {
    var usersString = fs.readFileSync('data/users.json');
    return JSON.parse(usersString);
  } catch (err) {
    return [];
  }
};


// Insert a User
var insertUser = (userName, password, email) => {
  var users = getUsers();


  var user = {
    userName,
    password,
    email
  };

  // ensure no dups
  var duplicateUsers = users.filter((user) => {
    return (user.userName === userName || user.email === email);
  });

  // persist the users
  if (duplicateUsers.length === 0) {
    users.push(user);
    saveUsers(users);
    return user;
  }
};

// persist data in file
var saveUsers = (users) => {
  fs.writeFileSync('/data/users.json', JSON.stringify(users));
};

module.exports = router;
