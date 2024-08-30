"use strict";

require('dotenv').config();

var _require = require('pg'),
    Pool = _require.Pool;

var dbPort = process.env.DB_PORT;
var dbHost = process.env.DB_HOST;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
var dbName = process.env.DB_NAME;
var pool = new Pool({
  user: dbUser,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  database: dbName
});

var checkDatabaseConnection = function checkDatabaseConnection() {
  var client;
  return regeneratorRuntime.async(function checkDatabaseConnection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.connect());

        case 3:
          client = _context.sent;
          console.log('Connected to PostgreSQL');
          client.release();
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

          if (_context.t0.code === '3D000') {
            // PostgreSQL error code for invalid catalog name (database does not exist)
            console.error("Database \"".concat(dbName, "\" does not exist. Please create the database and try again."));
          } else {
            console.error('Error connecting to PostgreSQL:', _context.t0);
          }

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

checkDatabaseConnection();
module.exports = pool;