var express = require('express');
var Event = require('../model/Event.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	Event.find({}, null, {
		sort: {
			datetime: -1
		}
	}, function(err, events) {
		if(err) {
			req.flash('errorMsg', err.message);
			res.render('index', {title: "Youshuhui", message: req.flash('errorMsg')});
		};
		res.render("index", {title: "Youshuhui", eventsList: events});
	});

});

router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
});

module.exports = router;
