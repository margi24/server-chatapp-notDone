const pool = require("../db")

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM hospital', (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.findAllNamesConating = (name) => {
    return new Promise((resolve, reject) => {
        let dynamicName = '%'.concat(name.concat('%'))
        pool.query('SELECT * FROM hospital where name like ?', [dynamicName], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.findByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM hospital where name = ?', [name], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

db.add = (hospital) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO hospital SET ?"
        pool.query(sql, hospital, (err,result) => {
        if(err) { 
            console.log(err)
            return reject(err)
        } 
            return resolve(result.insertId)
        })
    })
}

db.delete = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM hospital where name = ?', [name], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve('user deleted')
        })
    })
}

module.exports = db