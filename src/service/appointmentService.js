const pool = require("../db")

let db = {};

db.all = (idPacient) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM appointment where idPacient = ?', [idPacient], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM appointment ', (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.add = (appointment) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO appointment SET ?"
        pool.query(sql, appointment, (err,result) => {
        if(err) { 
            console.log(err)
            return reject(err)
        } 
            return resolve(result)
        })
    })
}

module.exports = db