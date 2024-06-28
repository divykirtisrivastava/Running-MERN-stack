const express = require('express')
const dotenv = require('dotenv')
require('dotenv').config();
const cors = require('cors')
const productRoute = require('./route/product.route.js')
const adminRoute = require('./route/admin.route.js')
const cartRoute = require('./route/cart.route.js')
const clientRoute = require('./route/client.Route.js')
const session = require('express-session');
const db = require('./dataBaseConfig.js')
// goggle auth
// goggle auth
const passport = require('passport');
const authRoutes  =require('./authRoutes.js')

let app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }));



let hostname = '127.0.0.1'
db.connect((err)=>{
    if(err) throw err
    else{
        console.log("database connected")
    }
})


let productTableQuery = `
CREATE TABLE IF NOT EXISTS product (
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    productImages VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(productTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("product table is craeted")
    }
})
let cartTableQuery = `
CREATE TABLE IF NOT EXISTS cart (
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    productImages VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(cartTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("cart table is craeted")
    }
})

let adminTableQuery = `
CREATE TABLE IF NOT EXISTS admin_table (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(adminTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("table has been created")
    }
})
let userDataTableQuery = `
CREATE TABLE IF NOT EXISTS userData (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(userDataTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("userData table has been created")
    }
})

app.listen(process.env.PORT, hostname , ()=>{
    console.log(`😃server is running at http://${hostname}:${process.env.PORT}/api/`)
})

app.use('/api', productRoute)
app.use('/api', adminRoute)
app.use('/api', cartRoute)
app.use('/api', clientRoute)

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);


