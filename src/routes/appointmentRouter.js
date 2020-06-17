const express = require('express')
const route = express.Router()
const appointmentService = require('../service/appointmentService')
//import appointment from '../data/appointment'
const log = console.log

const midleware = require('../midleware/midleware')
const authenticate =  midleware.authenticateToken

route.get('/:id', authenticate, async(req,res) => {
    try{
        log('get appointment for pacient')
        let idPacient = req.params.id
        let results = await appointmentService.all(idPacient)
        log(results)
        res.send(results)
    } catch(err) {
        res.sendStatus(500)
    }
})

route.get('/', authenticate, async(req,res) => {
    try{
        let results = await appointmentService.getAll()
        res.send(results)
    } catch(err) {
        res.sendStatus(500)
    }
})



route.post('/', authenticate, async(req,res) => {
    try{
        log('add appointment for pacient')
        let b = req.body
        let idHospital = b.idHospital
        let idDoctor = b.idDoctor
        let idPacient = b.idPacient
        let date = b.date
        let hour = b.hour
        let title = b.title
        let info = b.info
        let appointment = {idDoctor, idHospital,idPacient, date,hour,title,info}
        let results = await appointmentService.add(appointment)
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(500)
    }
})


module.exports = route;