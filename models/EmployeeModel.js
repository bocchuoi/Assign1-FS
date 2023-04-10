const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 100,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50,
    },    
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },  
    gender: {
        type: String,
        required: true,
        maxLength: 25,
        validate: (val) => {
            return ["male", "female", "other"].includes(val.toLowerCase())
        }
    },  
    salary: {
        type: Number,
        required: true,
        min: 0
    }  
})

module.exports = mongoose.model("employee", employeeSchema)