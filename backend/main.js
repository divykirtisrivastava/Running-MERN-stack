const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const productRoute = require('./route/product.route.js')
const db = require('./dataBaseConfig.js')
dotenv.config({
    path:'./.env'
})
let app = express()
app.use(express.json())
app.use(cors())
let hostname = '127.0.0.1'
db.connect((err)=>{
    if(err) throw err
    else{
        console.log("database connected")
    }
})


let userTableQuery = `
CREATE TABLE IF NOT EXISTS product (
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(userTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("user table is craeted")
    }
})

app.listen(process.env.PORT, hostname , ()=>{
    console.log(`😃server is running at http://${hostname}:${process.env.PORT}/api/`)
})

app.use('/api', productRoute)
