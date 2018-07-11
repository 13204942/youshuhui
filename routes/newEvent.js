var express = require('express');
var Event = require('../model/Event.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('newEvent', {title: "New Event", message: req.flash('eventMsg', '')});
});

router.post('/', function(req, res, next) {

	var newEvent = new Event(req.body);

	newEvent.save(function(err, newEvent) {
		if(err) {
			req.flash('errorMsg', err.message);
			res.render('newEvent', {title: "New Event", message: req.flash('errorMsg')});
			console.log('Event not saved!');
		};
		req.flash('successMsg', 'Event created successfully!')
		res.render('newEvent', {title: "New Event", message: req.flash('successMsg')});
		console.log('Event created successfully!');
	});
});

module.exports = router;
