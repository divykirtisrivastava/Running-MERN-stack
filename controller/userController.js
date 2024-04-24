const db = require('../dataBaseConfig.js')


exports.saveData= (req, res) =>{
    let name = req.body.name
    let email = req.body.email

    let value = [[name, email]]
    let sql = 'insert into user(name, email) values ?'
    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("data submitted")
        }
    })
}

exports.getData = (req, res)=>{
    let sql = "select * from user"

    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}