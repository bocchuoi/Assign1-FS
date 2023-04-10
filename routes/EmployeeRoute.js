const empModel = require("../models/EmployeeModel")
const express = require("express")
const routes = express.Router()

routes.get('/employees', async (req, res) => {
    try {
        const employees = await empModel.find()
        res.status(200).send(employees)
    } catch (error) {
        console.log(error)
        res.status(601).send(error)
    }
});

routes.post('/employees', async (req, res) => {
    const newEmp = empModel(req.body)
    try {
        await newEmp.save()
        res.status(201).send({msg: "The employee was added"})
    } catch (error) {
        if (error.code === 11000) {
            res.status(601).send({error: "Email is already in use"})
        }
        else {
            console.log(error)
            res.status(601).send(error)
        }

    }

});

routes.get('/employees/:eid', async (req, res) => {
    try {
        const emp = await empModel.findOne({_id:req.params.eid})
        if (emp) {
            res.status(200).send(emp)
        }
        else {
            res.status(404).send({error_msg: "employee not found"})
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(601).send({error: "Email is already in use. If this is the email of the employing that is being updated, please omit the email field!"})
        }
        else {
            res.status(600).send(err)
        }
    }

});

routes.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmp = await empModel.findByIdAndUpdate(req.params.eid, req.body)
        if (updatedEmp) {
            const nb = await updatedEmp.save()
            res.status(200).send({msg:"The employee is updated", old_employee_info:nb})
        }
        else {
            res.status(600).send({msg:"Couldn't find the employee with inputted id"})
        }

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send({msg:"The employee's email is already in use. If the is email belongs to the employee being updated and you don't want to change it, please omit the email field"})
        }
        else {
            res.status(600).send(error)
        }
    }

});

routes.delete('/employees', async (req, res) => {
    try {
        const deletedEmp = await empModel.findByIdAndDelete(req.query.eid)
        if (deletedEmp) {
            res.status(204).send()
        }
        else {
            res.status(600).send({msg:"Couldn't find the employee with inputted id"})
        }
    } catch (err) {
        res.status(600).send(err)
    }
});

module.exports = routes;