// Uses the mysql2 library for MySQL interactions and dotenv to keep db accessing info hidden from the source code. 
const mysql = require('mysql2');
require('dotenv').config();

// Creates the connection to MySQL databases from environment variables.
const connection = mysql.createConnection({ //DB accessing information.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connects to the database
connection.connect(error => {
    if (error) throw error; // Throws an exception if connection error occurs. 
    console.log("Successfully connected to the database."); 
});
// Export the connection class so it can be used in other files. 
module.exports = connection;
