var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

var eventsList = [];

let db = new sqlite3.Database('./db/youshuhui.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

/* GET home page. */
router.get('/', function(req, res, next) {

	db.serialize(function() {
	  // Select data from table to validate
	  db.each("SELECT title, description, location, start_date, start_time FROM events", function(err, row) {
			eventsList.push({title: row.title, description: row.description, location: row.location, start_date: row.start_date, start_time: row.start_time})
	  }, function() {
	  	//console.log(eventsList);
	  	res.render("index", {title: "Youshuhui", eventsList: eventsList});
	  });
	});

	db.close((err) => {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Close the database connection.');
	});

});

module.exports = router;
