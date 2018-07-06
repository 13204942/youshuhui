var express = require('express');
var passport = require('./passport.js');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', {title: "Signup", message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', { 
	successRedirect: '/login',
	failureRedirect: '/signup',
	failureFlash : true // allow flash messages
}));

module.exports = router;
