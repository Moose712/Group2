const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// //DB CONNECTION
const db = require("./API/models/connection_db")//Item
db.connectDatabase()

const user_db = require("./User_API/models/user_connection_db")//User
user_db.user_connectDatabase()

const ord_db = require("./Order_API/model/order_connection_db")//Order
ord_db.ord_connectDatabase()

// //ROUTERS
const kpopRouter = require('./API/routers/kpop_router')//Item

const userRouter = require('./User_API/router/user_router')//User

const ordRouter = require('./Order_API/router/order_router')//Order

//SETTINGS FOR BODY-PARSER AND MORGAN
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//HEADER SETTINGS
app.use((req, res, next)=>
{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Controll-Allow-Headers", "*")

    if(req.method === 'OPTIONS')
    {
        res.header("Access-Controll-Allow-Methods", "*")
        return res.status(200).json({})
    }

    next()
})

//MODULE ENDPOINT and ROUTER
app.use('/kpop', kpopRouter)//ITEM

app.use('/user', userRouter)//USER

app.use('/order', ordRouter)//ORDER

//ERROR MIDDLEWARE
app.use((req, res, next)=>
{
    const error = new Error('Not Found')
    error.status = 404
    next(error)

})

app.use((error, req, res, next)=>
{
    res.status(error.status || 500)
    res.json(
    {
        error:
        {
            messege: error.messege
        }
    })
})


module.exports = app