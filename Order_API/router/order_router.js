const express = require('express')
const ordController = require('../controller/order_controller')

const ordRouter = express.Router()

//creating 
ordRouter.post('/create', ordController.createOrder)

//viewing
ordRouter.get('/view/all', ordController.viewAllOrder)
ordRouter.get('/view/:id', ordController.viewOrder)

//updating
ordRouter.put('/updateStatus/:id', ordController.updateItem)



module.exports = ordRouter