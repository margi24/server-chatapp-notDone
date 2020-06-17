const express = require('express')
const route = express.Router()
const doctorService = require('../service/doctorService')
const userService = require('../service/userService')
const midleware = require('../midleware/midleware')
const authenticate =  midleware.authenticateToken

route.get('/', authenticate,  async (req,res) => {
    try{
        let results = await doctorService.all();
        res.send(results)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

route.get('/:idHospital', authenticate,  async (req,res) => {
    try{
        let results = await doctorService.allForHospital(req.params.idHospital);
        res.send(results)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = route