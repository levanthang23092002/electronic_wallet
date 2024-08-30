require('dotenv').config();
const { Pool } = require('pg');

const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const pool = new Pool({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: dbName,
});

const checkDatabaseConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');
        client.release();
    } catch (err) {
        if (err.code === '3D000') { // PostgreSQL error code for invalid catalog name (database does not exist)
            console.error(`Database "${dbName}" does not exist. Please create the database and try again.`);
        } else {
            console.error('Error connecting to PostgreSQL:', err);
        }
    }
};

checkDatabaseConnection();

module.exports = pool;
