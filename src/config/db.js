const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
});

pool.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.error("DB Connection Error:", err));

module.exports = pool;
