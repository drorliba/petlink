/***
This code sets up the Node.js server using Express, configures middleware for JSON parsing and CORS, imports route handlers for users and pets, runs database migrations, and starts the server on the specified port (or default port 8080 if not provided via environment variables).
***/

// Import required modules and libraries
const express = require('express');
require('dotenv').config(); // Load environment variables from a .env file
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080; // Set the server's port
const dbConnection = require('./knex/knex'); // Import the Knex database connection

const authRoute = require('./routes/authRoute'); // Import the auth route
const usersRoute = require('./routes/usersRoute'); // Import the users route
const petsRoute = require('./routes/petsRoute'); // Import the pets route

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

app.use('/', authRoute); // Define a route for handling authentication endpoints

app.use('/users', usersRoute); // Define a route for handling user-related endpoints
app.use('/pets', petsRoute); // Define a route for handling pet-related endpoints

// Run database migrations and start the server if successful
dbConnection.migrate.latest()
    .then(migration => {
        if (migration) {
            console.log('Connected to DB ' + migration);
            app.listen(PORT, () => {
                console.log(`Server is listening on http://localhost:${PORT}/`);
            });
        }
    });