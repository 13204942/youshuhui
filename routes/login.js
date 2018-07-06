var express = require('express');
var passport = require('./passport.js');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: "Login", message: req.flash('loginMessage') });
});

router.post('/', passport.authenticate('local-login', { 
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash : true // allow flash messages
}));

module.exports = router;
