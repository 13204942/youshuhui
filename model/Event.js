// models/Event.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our Event model
var eventSchema = mongoose.Schema({
  local : {
    title  			: String,
    location  	: String,
    datetime		: {type: Date},
    description : String
  }
});

// methods
// ...

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);