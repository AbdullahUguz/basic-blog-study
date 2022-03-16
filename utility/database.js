const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'argerf-db',
    password:'12345'
});

module.exports =connection.promise();

