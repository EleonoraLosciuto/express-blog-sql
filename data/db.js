import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'db_local1234!',
    database: 'db_blog'
});


export default connection;