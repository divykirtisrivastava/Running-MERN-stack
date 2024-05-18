const db = require('../dataBaseConfig.js')

exports.saveData = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let value = [[email, password]]
    let sql = 'insert into admin_table(email,password) values ?'
    db.query(sql, [value], (err, result) => {
        if (err) throw err
        else {
            res.send('data saved in database')
        }
    })
}

exports.adminLogin = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let sql = 'select * from admin_table where email =? and password =?'
    db.query(sql, [email, password], (err, result) => {
        if (err) throw err
        else {
            if (result.length > 0) {
                res.send(true)
            } else {
                res.send(false)
            }
        }
    })
}