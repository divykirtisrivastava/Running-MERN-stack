const db  = require('../dataBaseConfig.js')

exports.cartSave = (req, res)=>{
    let productBrand = req.body.productBrand
    let productType = req.body.productType
    let productRating = req.body.productRating
    let productPrice = req.body.productPrice
    let productImages = req.body.productImages
    let username = req.params.username
    let value = [[productBrand, productType, productRating, productPrice, productImages]]

    let sql = `insert into ${username}(productBrand, productType, productRating, productPrice, productImages) values ?`

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("product saved")
        }
    })
    
}

exports.getCart = (req, res)=>{
    let username = req.params.username
    let sql  = `select * from ${username}`
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteCart = (req, res)=>{
    let id = req.params.id
    let username = req.params.username
    let sql = `delete from ${username} where id = ?`
    db.query(sql, [id], (err,result)=>{
        if(err) throw err
        else{
            res.send("data deleted")
        }
    })
}