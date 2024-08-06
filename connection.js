const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dir_iroll',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

// Testing the connection pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        connection.release();
    }
});

module.exports = pool;
