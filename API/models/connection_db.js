const mysql = require('mysql')

//DATABASE DETAILS
//HOST, USER, DATABASE NAME/SCHEMA, PORT(OPTIONAL)

const db = mysql.createConnection(
    {
        host:"localhost",
        user: "root",
        database: "kpop_db"
    })

const connectDatabase = ()=>
{
    db.connect((error)=>
    {
        if (error)
        {
            console.log("There is an error, kindly check your database.")
        }
        else
        {
            console.log("Connection to the ITEM database has been successfully established.")
        }
    })
}

module.exports = {
    db,
    connectDatabase
}