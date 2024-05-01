const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const db = require('./dataBaseConfig.js')
const userRouter = require('./route/userRoute.js')

let app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))


let port = 3000
let hostname = '127.0.0.1'

db.connect((err)=>{
    if(err) throw err
    else{
        console.log("database connected")
    }
})


let userTableQuery = `
CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(userTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("user table is craeted")
    }
})


app.get('/', (req, res)=>{
    res.render('index')
})

app.use('/api', userRouter)


app.listen(port, hostname , ()=>{
    console.log(`server is running at http://${hostname}:${port}`)
})


