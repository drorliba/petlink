/* This file contains the configuration for Knex, specifying the MySQL database connection details, connection pool settings, and the directory where migration files are located. This configuration is used by Knex when a database connection is created in the application. */

const path = require('path');
const pathToMigrations = path.resolve(__dirname, '../migrations');

module.exports = {
  client: "mysql",
  connection: {
    database: "petsDB",
    user: "root",
    password: "025816477",
    host: "localhost",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: pathToMigrations
  },
};