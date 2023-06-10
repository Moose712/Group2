const express = require('express')
const itemController = require('../controllers/kpop_controller')

const kpopRouter = express.Router()

//add (POST)
kpopRouter.post('/add-item', itemController.addItem)

//view (GET)
kpopRouter.get('/view/all', itemController.viewAllProducts)
kpopRouter.get('/view/keyword', itemController.viewAllProductsKeyword)

//update (PUT)
kpopRouter.put('/updateprice/:id', itemController.updatePrice)
kpopRouter.put('/updateqty/:id', itemController.updateQuantity)

//delete (DELETE)
kpopRouter.delete('/delete/:id', itemController.deleteItem)

module.exports = kpopRouter