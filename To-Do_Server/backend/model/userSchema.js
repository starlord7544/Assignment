const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: [true , "Username is mandatory"],
        unique : true,
    },
    password : {
        type : String,
        required: [true , "Password is mandatory"],
    },
    tasks: [
        {
            task: {
                type: String,
                required: true,
            },
            isChecked: {
                type: Boolean,
                default: false, 
            },
        }
    ],
}) 

const User = mongoose.model('Users' , userSchema)

module.exports = User