const connection = require('./connection.js'); 

// Testing the connection
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
        console.error('An error occurred while testing the connection:', error);
        return;
    }
    console.log('The solution is: ', results[0].solution);
    connection.end(); // Closing the connection
});
