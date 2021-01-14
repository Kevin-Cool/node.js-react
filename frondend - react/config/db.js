require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth: true
});

module.exports = pool;
