var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('./db/youshuhui.sqlite');

let db = new sqlite3.Database('./db/youshuhui.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

db.serialize(function() {

	// Drop tables if tables exist
	//db.run("DROP TABLE if exists users");
  db.run("DROP TABLE if exists events");

	// Create new tables
  db.run("CREATE TABLE if not exists users (user_id integer PRIMARY KEY, username text, password text)");
  db.run("CREATE TABLE if not exists events (event_id integer PRIMARY KEY, title NVARCHAR(100), description NVARCHAR(5000), location NVARCHAR(500), start_date DATE, start_time DATETIME)");

  // Insert data into table
  //db.run(`INSERT INTO users (username, password) VALUES (?)`);

  /*
  db.run(`INSERT INTO users (username, password) VALUES (?,?)`, ['admin','pwd'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  */

  // Select data from table to validate
  db.each("SELECT rowid AS id, username, password FROM users", function(err, row) {
      console.log(row.id + ": " + row.username );
  });
 	/*
  var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
 	*/
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});