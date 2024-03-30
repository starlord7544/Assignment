const User = require('../model/userSchema')

module.exports.getAllUsers = async (req , res) => {
    try {
        const allUsers = await User.find()
        res.status(200)
        res.send({
            status : 'success',
            body : allUsers
        })
    }
    catch (err) {
        res.status(400)
        res.send({
            status : 'fail',
            message : err.message
        })
    }
}

module.exports.createUser = async (req , res) => {
    try {
        const newUser = await User.create(req.body)
        console.log("entry updated")
        res.status(201);
        res.send({
            status: 'success',
            body : newUser
        });
    }
    catch (err) {
        console.log(err)
        res.status(400)
        res.send({
            status : 'fail',
            message : err.message
        })
    }
}

module.exports.getUser = async (req , res) => {
    try {
        const {username : paramUser} = req.params
        const user = await User.find({
            "username" : paramUser
        })
        if (user.length === 0)
        throw new Error ("Invalid User ID")
        res.status(200)
        res.send({
            status : 'success',
            body : user
        })
    }
    catch(err) {
        res.status(404);
        res.json({
            status: 'fail',
            message: err.message,
        });
    }
}

module.exports.patchUpdateTask = async (req , res) => {
    const {username : paramUser} = req.params
    const { username, ...newTask} = req.body
    try {
        const updatedTask = await User.findOneAndUpdate({"username" : paramUser} , newTask , {
            new : true,
        })
        console.log("entry Patched")
        res.status(201);
        res.json({
            status: 'success',
            body : updatedTask
        });
    }
    catch (err) {
        res.status(404)
        res.send({
            status : 'fail',
            message : err.message,
        })
    }
}

module.exports.deleteUsertask = async (req , res) => {
    const {username : paramUser} = req.params
    // const { username, ...task} = req.body
    try {
        const deleteTask = await User.findOneAndDelete({
            "username" : paramUser
        })

        if(!deleteTask)
        throw new Error("Invalid User ID")
        
        console.log("entry deleted")
        res.status(204)
        res.json({
            status: 'success',
            body: null
        })
    }
    catch (err) {
        res.status(404)
        res.send({
            status: 'fail',
            message : err.message
        })
    }
}