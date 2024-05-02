const db = require('../dataBaseConfig.js')


exports.saveData= (req, res) =>{
    let name = req.body.name
    let email = req.body.email

    let value = [[name, email]]
    let sql = 'insert into user(name, email) values ?'
    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.redirect('/api/viewData')
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

exports.deleteData = (req, res)=>{
    let sql = "delete from user where id = ?"
    let id = req.params.id

    db.query(sql , [id] , (err, result)=>{
        if(err) throw err
        else{
            res.send("data deleted")
        }
    })
}

exports.updateProduct = (req, res)=>{
    let id = req.params.id
    let newData = req.body
    let sql = 'update user set ? where id = ?'

    db.query(sql, [newData, id], (err, result)=>{
        if(err) throw err
        else{
            res.send("data updated")
        }
    })
}

exports.submitFile = (req, res)=>{
    res.render('index')
}

exports.viewFile = (req, res)=>{
    let sql = 'select * from user'
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.render('viewData', {data: result})
        }
})
}