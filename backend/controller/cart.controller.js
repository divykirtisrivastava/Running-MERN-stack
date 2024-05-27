const db  = require('../dataBaseConfig.js')

exports.cartSave = (req, res)=>{
    let productBrand = req.body.productBrand
    let productType = req.body.productType
    let productRating = req.body.productRating
    let productPrice = req.body.productPrice
    let productImages = req.body.productImages
    let value = [[productBrand, productType, productRating, productPrice, productImages]]

    let sql = 'insert into cart(productBrand, productType, productRating, productPrice, productImages) values ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("product saved")
        }
    })
    
}

exports.getCart = (req, res)=>{
    let sql  = 'select * from cart'
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteCart = (req, res)=>{
    let id = req.params.id
    let sql = "delete from cart where id = ?"
    db.query(sql, [id], (err,result)=>{
        if(err) throw err
        else{
            res.send("data deleted")
        }
    })
}