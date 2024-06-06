const db = require('../dataBaseConfig.js')
const bcrypt = require('bcryptjs')

exports.clientSave = async (req, res)=>{
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let hashPassword = await bcrypt.hash(password, 10)
    let image = req.file.filename

    let value = [[username, email, hashPassword, image ]]

    let sql = 'insert into userdata(username, email, password, image ) values ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send('data submit')
        }
    })
}

exports.clientLogin = (req, res)=>{
    try {
    let username = req.body.username
    let password = req.body.password
    let sql = 'select * from userdata where username = ?'

    db.query(sql, [username], (err, result)=>{
        if(err) throw err
        else{
            console.log(result)
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, isMatch)=>{
                    console.log(isMatch)
                    res.send(isMatch)
                })
            } else {
                res.send(false)
            }
        }
    })
    } catch (error) {
        console.log(error)
    }
}

