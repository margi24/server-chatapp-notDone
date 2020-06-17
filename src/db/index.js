const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Diana1234',
    database: 'ell',
    connectionLimit: 10,
    multipleStatements: true
})

module.exports = pool