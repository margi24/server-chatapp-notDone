const express = require('express')
const route = express.Router()
const log = console.log
const hospitalService = require('../service/hospitalService')
const specialityService = require('../service/specialityService')
const doctorService = require('../service/doctorService')
const userService = require('../service/userService')
const midleware = require('../midleware/midleware')
const authenticate =  midleware.authenticateToken

route.get('/', authenticate,  async (req,res) => {
    try{
        let results = await hospitalService.all();
        res.send(results)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

route.post('/', authenticate,  async (req,res) => {
    try{
        let hospital = {name: req.body.name, city: req.body.city, country: req.body.country, street: req.body.street}
        let idUser = req.body.userId
        let speciality = req.body.speciality;
        let findHospital = await hospitalService.findByName(hospital.name);
        let userCredentials = await userService.oneById(idUser)
        let result;
        if(findHospital == null) {
            result = await hospitalService.add(hospital);
            let idHospital = result
            let doctor = {idUser: idUser, idHospital: idHospital, speciality:speciality, firstName: userCredentials.firstName, lastName: userCredentials.lastName}
            let idDoctor =  await doctorService.add(doctor)
            let specialityObject = {idHospital, idDoctor, speciality}
            try { await specialityService.add(specialityObject) } catch(err) {console.log(err)}
        } else {
            try {
                let idHospital = findHospital.id
                let doctor = {idUser: idUser, idHospital: idHospital, speciality:speciality, firstName: userCredentials.firstName, lastName: userCredentials.lastName}
                let idDoctor =  await doctorService.add(doctor)
                let existingSpeciality = await specialityService.findByIdAndSpeciality(idHospital, idDoctor,speciality)
                if(existingSpeciality == null) {
                    try{
                        let specialityObject = {idHospital, idDoctor, speciality}
                        await specialityService.add(specialityObject)
                    } catch(err) {
                        console.log(err)
                    }
                }
            } catch(err) {
                console.log(err)
            }
        }
        if( result == null) result = findHospital.id
        res.status(200).json({
            succes: true,
            data: result
        }).send()
    } catch(err) {
        console.log(err)
        res.status(500).json({
            succes: false
        }).send()
    }
})

route.get('/:name', authenticate, async (req,res) => {
    try{
        let result = await hospitalService.find(req.params.name);
        res.status(200).json({
            succes: true,
            data: result
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            info: "nu exista"
        })
    }
})


module.exports = route;