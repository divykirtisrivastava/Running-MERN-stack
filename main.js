const express = require('express')
const db = require('./dataBaseConfig.js')
const userRouter = require('./route/userRoute.js')

let app = express()
app.use(express.json())
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
    res.sendFile(__dirname + '/index.html')
})

app.use('/api', userRouter)


app.listen(port, hostname , ()=>{
    console.log(`server is running at http://${hostname}:${port}`)
})


