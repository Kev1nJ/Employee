const mysql = require('mysql');
const fs = require("fs");

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LiquidSwords329388',
  database: 'employeedatabase',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;

// Read the schema.sql file
const schemaSql = fs.readFileSync('db/schema.sql', 'utf8');

// Execute the SQL script to initialize the database
connection.query(schemaSql, (err) => {
  if (err) {
    console.error('Error initializing the database:', err);
  } else {
    console.log('Database initialized.');
  }
  connection.end();
});
