var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

let db = new sqlite3.Database('./db/youshuhui.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the youshuhui database.');
});

passport.use(new LocalStrategy({
	passReqToCallback: true  // request object isn't passed to the strategy callback by default, you need to set the passReqToCallback option
}, function(req, username, password, done) {
  db.get('SELECT username, user_id FROM users WHERE username = ? AND password = ?', username, password, function(err, row) {
    if (!row) {
    	return done(null, false, req.flash('loginMessage', 'Invalid username or password'));
    }
    return done(null, row);
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
  db.get('SELECT user_id, username FROM users WHERE user_id = ?', id, function(err, row) {
    if (!row) {
    	return done(null, false);
    }
    return done(null, row);
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: "Login" });
});

router.post('/',  function(req,res,next){
	passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true // allow flash messages
	})
	(req, res, next);
});

module.exports = router;
