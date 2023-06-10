const mysql = require('mysql')

//DATABASE DETAILS
//HOST, USER, DATABASE NAME/SCHEMA, PORT(OPTIONAL)

const ord_db = mysql.createConnection(
    {
        host:"localhost",
        user: "root",
        database: "kpop_db"
    })

const ord_connectDatabase = ()=>
{
    ord_db.connect((error)=>
    {
        if (error)
        {
            console.log("An error has occurred. Please check the database for further investigation.")
        }
        else
        {
            console.log("Connection to the USER + ITEM database has been successfully established.")
        }
    })
}

module.exports = {
    ord_db,
    ord_connectDatabase
}