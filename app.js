var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var eventsRouter = require('./routes/events');
var newEventRouter = require('./routes/newEvent');

// configuration 
var configDB = require('./config/database.js');
// connect to our database
mongoose.connect(configDB.url, { useNewUrlParser: true }); // connect to our database

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({ 
	resave: true,
	saveUninitialized: true,
	secret: 'secret cat',
	cookie: { maxAge: 60000 }
})); 
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Bootstrap, Moment, Datetimepicker
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/min/'));
app.use('/datetimepicker', express.static(__dirname + '/node_modules/eonasdan-bootstrap-datetimepicker/build/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/events', eventsRouter);
app.use('/newEvent', newEventRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
