const db  = require('../dataBaseConfig.js')

exports.saveProduct = (req, res)=>{
    let productBrand = req.body.productBrand
    let productType = req.body.productType
    let productRating = req.body.productRating
    let productPrice = req.body.productPrice
    let value = [[productBrand, productType, productRating, productPrice]]

    let sql = 'insert into product(productBrand, productType, productRating, productPrice) values ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("product saved")
        }
    })
    
}

exports.getProduct = (req, res)=>{
    let sql = 'select * from product'
    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteProduct = (req, res)=>{
    let id = req.params.id
    let sql = "delete from product where id = ?"
    db.query(sql, [id], (err,result)=>{
        if(err) throw err
        else{
            res.send("data deleted")
        }
    })
}