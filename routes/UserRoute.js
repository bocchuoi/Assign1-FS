const userModel = require("../models/UserModel.js")
const express = require("express")

const routes = express.Router()

routes.post('/signup', async (req, res) => {
    const newUser = new userModel(req.body)
    try {
        await newUser.save()
        let result = {msg: "Account Registered"}
        res.status(201).send(result)
    } catch (error) {
        if (error.code === 11000) {
            let errorMsg = (error.keyPattern.username) ? "User name is already in use" : "Email is already in use" 
            res.status(601).send({error: errorMsg})
        }
        else {
            res.status(601).send(error)
        }
    }
});

routes.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({username:req.body.username})
        if (user && user.password === req.body.password) {
            res.status(200).send({status:"logged in"})
        }
        else {
            res.status(410).send({status:"failed", msg:"invalid username or password"})
        }
    } catch (error) {
        console.log(error)
        res.status(600).send(error)
    }

});

routes.get('/', async (req, res) => {
    const users = await userModel.find()
    res.status(200).send(users)
});

module.exports = routes;