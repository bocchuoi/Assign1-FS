const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 100,
        unique: [true, "This username is already in use"]
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },    
    password: {
        type: String,
        required: true,
        maxLength: 50
    }  
})

module.exports = mongoose.model("user", userSchema)
