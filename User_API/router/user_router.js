const express = require('express')
const userController = require('../controller/user_controller')

const userRouter = express.Router()

//add (POST)
userRouter.post('/add-user', userController.addUser)

//view (GET)
userRouter.get('/view', userController.viewAllUser)

//updates (PUT)
userRouter.put('/updateusername/:username', userController.updateUsername)
userRouter.put('/updatepassword/:username', userController.updatePassword)
userRouter.put('/updatefirstName/:username', userController.updatefirstName)
userRouter.put('/updatelastName/:username', userController.updatelastName)
userRouter.put('/updateage/:username', userController.updateAge)
userRouter.put('/updatebirthday/:username', userController.updateBirthday)
userRouter.put('/updatecontact/:username', userController.updateContact)

//delete (DELETE)
userRouter.delete('/delete/:username', userController.deleteUser)

//login (PUT)
userRouter.put('/login', userController.login)

module.exports = userRouter