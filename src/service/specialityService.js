const pool = require("../db")

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM speciality', (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.allForHospital = (idHospital) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT speciality FROM speciality WHERE idHospital like ?', [idHospital], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

db.getDoctorsId = (idHospital) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT idDoctor FROM speciality WHERE idHospital like ?', [idHospital], (err, results) =>{
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

db.findByIdAndSpeciality = (hId,dId, speciality) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM speciality where idHospital = ? and dId = ? and speciality = ?', [hId, dId,speciality], (err, results) =>{
            if(err) {
                return reject(err)
            }
            return resolve(results[0])
        })
    })
}

db.add = (speciality) => {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO speciality SET ?"
        pool.query(sql, speciality, (err,result) => {
        if(err) { 
            console.log(err)
            return reject(err)
        } 
            return resolve(result)
        })
    })
}

module.exports = db