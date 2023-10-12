/*
This code exports a configured Knex database connection using the settings defined in "knexfile.js." It allows to interact with the MySQL database using Knex methods in other parts of the application.
*/

// Import the Knex configuration from 'knexfile.js'
const knexConfig = require('./knexfile');

// Import the Knex library
const knex = require('knex');

// Create a database connection using the Knex library and the configuration
const dbConnection = knex(knexConfig);

// Export the database connection for use in other parts of the application
module.exports = dbConnection;