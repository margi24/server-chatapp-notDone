const express = require('express')
const route = express.Router()
const userService = require('../service/userService')

route.get('/', async (req,res) => {
    try{
        let results = await userService.all();
        res.status(200).json({
            succes: true,
            data: results
        })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

route.post('/', async (req,res) => {
    try{
        let user = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, type: req.body.type}
        let result = await userService.add(user);
        res.status(200).json({
            succes: true,
            data: result
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            succes: false
        })
    }
})

route.get('/:email', async (req,res) => {
    try{
        let result = await userService.oneByEmail(req.params.email);
        res.status(200).json({
            succes: true,
            data: result
        })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})



route.delete('/:email', async (req,res) => {
    try{
        let result = await userService.delete(req.params.email);
        res.status(200).json({
            succes: true,
            data: result
        })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = route;