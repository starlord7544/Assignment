const express = require('express')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .delete(userController.deleteUsertask)

userRouter
    .route('/:username')
    .get(userController.getUser)
    .patch(userController.patchUpdateTask)
    .delete(userController.deleteUsertask)

module.exports = userRouter