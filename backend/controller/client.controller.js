const db = require('../dataBaseConfig.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function genrateToken(user){
   return   jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

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



exports.clientLogin = async (req, res)=>{
    try {
    let username = req.body.username
    let password = req.body.password
    let sql = 'select * from userdata where username = ?'

    db.query(sql, [username],  (err, result)=>{
        if(err) throw err
        else{
            
            console.log(result)
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, async (err, isMatch)=>{
                   let token  = await genrateToken(result[0])
                   console.log(token)
                    res.send({token, isMatch})
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

exports.createClient = (req, res)=>{
    let username = req.params.username
    let clientTableQuery = `
CREATE TABLE IF NOT EXISTS ${username} (
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    productImages VARCHAR(255) NULL,
    PRIMARY KEY (id));
`
db.query(clientTableQuery, (err, result)=>{
    if(err) throw err
    else{
        console.log("cart table is craeted")
    }
})
}

exports.getClient = (req, res)=>{
    let username = req.params.username
    let sql = "select * from userdata where id = ?"

    db.query(sql, [username], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })

}

exports.profile = (req, res)=>{
    let token  = req.headers['authorization'].split(' ')[1]
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err) throw err
            else{
                db.query("select * from userdata where id = ?", [decode.id], (err, result)=>{
                    if(err) throw err
                    else{
                        res.json(result[0])
                    }
                })
            }
        })
    }
}