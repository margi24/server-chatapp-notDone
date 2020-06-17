const pool = require("../db")

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM doctor', (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.allForHospital = (idHospital) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM doctor WHERE idHospital like ?', [idHospital], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}


db.find = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM speciality where speciality like ?', [name], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

db.findByIdAndSpeciality = (hId, speciality) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM speciality where idHospital = ? and speciality = ?', [hId, speciality], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

db.add = (doctor) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO doctor SET ?"
        pool.query(sql, doctor, (err,result) => {
        if(err) { 
            console.log(err)
            return reject(err)
        } 
            return resolve(result.insertId)
        })
    })
}

module.exports = db