// models/Event.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our Event model
var eventSchema = mongoose.Schema({
  title  			: String,
  location  	: String,
  datetime		: {type: Date},
  description : String
});

// methods
// ...

// create the model for events and expose it to our app
module.exports = mongoose.model('Event', eventSchema);