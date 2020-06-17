const express = require('express')
const route = express.Router()
const specialityService = require('../service/specialityService')
const userService = require('../service/userService')
const midleware = require('../midleware/midleware')
const authenticate =  midleware.authenticateToken

route.get('/', authenticate,  async (req,res) => {
    try{
        let results = await specialityService.all();
        res.send(results)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

route.get('/:idHospital', authenticate,  async (req,res) => {
    try{
        let results = await specialityService.allForHospital(req.params.idHospital);
        res.send(results)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

route.get('/doctor/:idHospital', authenticate,  async (req,res) => {
    try{
        let idDoctors = await specialityService.getDoctorsId(req.params.idHospital);
        let ids = idDoctors.map((id) => id.idDoctor)
        let specialities = await specialityService.allForHospital(req.params.idHospital)
        let users = await userService.all()
        let doctors = users.filter(doc => 
            ids.includes(doc.id)         
        )
        let goodDoctors = []
        for(i=0; i<doctors.length; i++) {
        //    goodDoctors.push(idDoctor: doc.id, lastName: doc.lastName, firstName: doc.firstName, speciality: specialities[i].speciality)
        }
        console.log(result)
        res.send(doctors)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

function getDoctor(idDoctors, specialities) {
    var doctors = new Array()
    let doc, doctor
        let i = 0;
        idDoctors.forEach(async(element) => {
            try{
                doc = await userService.oneById(element.idDoctor)
                doctor = {idDoctor: doc.id, lastName: doc.lastName, firstName: doc.firstName, speciality: specialities[i].speciality }
            } catch (err) {
                console.log(err)
            }
            doctors.push(doctor)
            i++;
        });
    return doctors
}

function getDoctor2(idDoctors, specialities) {
    var doctors = new Array()
    let doctor
        let i = 0;
        idDoctors.forEach(async(element) => {
            return userService.oneById(element.idDoctor).then((doc) => {
                doctor = {idDoctor: doc.id, lastName: doc.lastName, firstName: doc.firstName, speciality: specialities[i].speciality }
                doctors.push(doctor)
                i++;
            }).catch((err) => {
                console.log(err)
            })
        });
}

module.exports = route