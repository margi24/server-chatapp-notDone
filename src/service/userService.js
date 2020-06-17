const pool = require("../db")

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user', (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.oneByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user where email = ?', [email], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

db.oneById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user where id = ?', [id], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

db.add = (user) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO user SET ?"
        pool.query(sql, user, (err,result) => {
        if(err) { 
            console.log(err)
            return reject(err)
        } 
            return resolve(result)
        })
    })
}

db.delete = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM user where email = ?', [email], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve('user deleted')
        })
    })
}

module.exports = db