const mysql = require('mysql')

let connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: "1234",
    database:'e-commerce-MERN'
})

module.exports = connection




