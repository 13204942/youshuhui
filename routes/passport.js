var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/User.js');
var router = express.Router();

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
//
passport.use('local-signup', new LocalStrategy({
	username: 'username',
	password: 'password',
	passReqToCallback: true  // request object isn't passed to the strategy callback by default, you need to set the passReqToCallback option
}, function(req, username, password, done) {
	User.findOne({
		'local.username' :  username
	}, function(err, user) {

		if (err) {
			return done(err);
		}

		if (user) {
			return done(null, false, req.flash('signupMessage', 'That username is already taken'));
		} else {

			var newUser = new User();
			newUser.local.username = username;
			newUser.local.password = password;

			newUser.save(function(err) {
				if (err) {
					throw err;
				}
				return done(null, newUser);
			});
		}

	});
	}
));

// =========================================================================
// LOCAL LOGIN ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
//
passport.use('local-login', new LocalStrategy({
	username: 'username',
	password: 'password',
	passReqToCallback: true  // request object isn't passed to the strategy callback by default, you need to set the passReqToCallback option
}, function(req, username, password, done) {
	User.findOne({
		'local.username' :  username,
		'local.password' :  password
	}, function(err, user) {

		if (err) {
			return done(err);
		}

		if (user == null) {
			return done(null, false, req.flash('loginMessage', 'Invalid username or password'));
		}
  	// all is well, return successful user
		return done(null, user);
	});
	}
));

module.exports = passport; // Exporting passport
