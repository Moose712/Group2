const mysql = require('mysql')

//DATABASE DETAILS
//HOST, USER, DATABASE NAME/SCHEMA, PORT(OPTIONAL)

const user_db = mysql.createConnection(
    {
        host:"localhost",
        user: "root",
        database: "kpop_db"
    })

const user_connectDatabase = ()=>
{
    user_db.connect((error)=>
    {
        if (error)
        {
            console.log("An error has occurred. Please check the database for further investigation.")
        }
        else
        {
            console.log("Connection to the USER database has been successfully established.")
        }
    })
}

module.exports = 
{
    user_db,
    user_connectDatabase
}