require('dotenv').config()

const express = require('express')
const route = express.Router()
const userService = require('../service/userService')
const jwt = require('jsonwebtoken')
const log = console.log
const bcrypt = require('bcrypt')
var CryptoJS = require("crypto-js");

route.post('/login', async (req,res) => {
    try{
        let user = await userService.oneByEmail(req.body.email);
        if(user == null )  res.status(400).send('Cannot find user')
        for(let i = 0; i < 10; i++) {
            let hashedPassword = CryptoJS.SHA256(req.body.password + i.toString()).toString(CryptoJS.enc.Base64)    
            if( await bcrypt.compare(hashedPassword, user.password)) {
                let userEmail = user.email
                let userDTO = {id: user.id, firstName: user.firstName, lastName: user.lastName, type: user.type  }
                const accessToken = generateAccesToken(userEmail)
                const refreshToken = jwt.sign(userEmail, process.env.REFRESH_TOKEN_SECRET)
                res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    userDTO: userDTO
                }).send()
            } 
        }
        res.status(405).json({
            succes: false,
            message: "Not allowed"
        }).send()
    } catch {
        res.status(500).send()
    }
})

route.post('/register', async (req,res) => {
    log("register")
    let pepper = Math.floor(Math.random() * 10)
    let body = req.body
    try {
        let userFind = await userService.oneByEmail(req.body.email);
        if(userFind != null ){
            res.status(400).json({
                success: 'User already exist'
            }).send()
        }
        let hashedPassword = CryptoJS.SHA256(req.body.password + pepper.toString()).toString(CryptoJS.enc.Base64)    
        let bcryptPassword = await bcrypt.hash(hashedPassword,10)
        const user = {firstName: body.firstName, lastName: body.lastName, email: body.email, password: bcryptPassword, type: body.type}
        userService.add(user)
        res.status(200).json({
            success: true
        }).send()
    } catch {
        res.status(500).send()
    }  
})

route.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403)
            const accessToken = generateAccesToken({email: user.email})
            res.json({
                accessToken: accessToken
            })
    })
}) 

function generateAccesToken(userEmail) {
    return jwt.sign({userEmail: userEmail}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'3600s'})
}  
module.exports = route;