
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8'),
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = db;
