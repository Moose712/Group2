const database = require('../models/user_connection_db')
const userModel = require('../models/user_model')

//add
const addUser = (req, res, next) => 
{
    let userUsername = req.body.username;
    let userPassword = req.body.password;
    let userfirstName = req.body.firstName;
    let userlastName = req.body.lastName;
    let userAge = req.body.age;
    let userBirthday = req.body.birthday;
    let userContact = req.body.contact;

    if (userUsername == "" || userUsername == null || userPassword == "" || userPassword == null) 
    {
        res.status(404).json(
        {
            successful: false,
            message: "Please provide a valid username or password."
        })
    } 
    else 
    {
        // Check if the username already exists
        let query = `SELECT username FROM users_tbl WHERE username = '${userUsername}'`

        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                    {
                        successful: false,
                        message: err
                    })
            } 
            else 
            {
                if (rows.length > 0) 
                {
                    // User already exists
                    res.status(400).json(
                        {
                            successful: false,
                            message: "The username you mentioned already exists in our records."
                        })
                } 
                else
                {
                    // Perform insert query to the database
                    let insertQuery = `INSERT INTO users_tbl SET ?`
                    let userObj = userModel.user_model(userUsername, userPassword, userfirstName, userlastName, userAge, userBirthday, userContact)

                    database.user_db.query(insertQuery, userObj, (err, rows, result) => 
                    {
                        if (err) 
                        {
                            res.status(500).json(
                                {
                                    successful: false,
                                    message: err
                                })
                        } 
                        else 
                        {
                            res.status(200).json(
                                {
                                    successful: true,
                                    message: "The user has been successfully added."
                                })
                        }
                    })
                }
            }
        })
    }
}
//view
const viewAllUser = (req, res, next)=>
{
    let query = `SELECT * FROM users_tbl`
    database.user_db.query(query, (err, rows, result)=>
    {
        if (err)
        {
            res.status(500).json(
            {
                successful: false,
                message: err
            })
        }
        else
        {
            const count = rows.length; // count the number of rows
            if (count === 0) 
            { // check if there are no rows
                res.status(200).json(
                {
                successful: true,
                message: "No users have been added yet."
                })
            } 
            else 
            {
                res.status(200).json(
                {
                    successful: true,
                    message: "Here is a list of the users along with their details:",
                    count: count,
                    data: rows
                })
            }   
        }
    })
}

//updates
const updateUsername = (req, res, next) => 
{
    let Username = req.params.username;
    let userUsername = req.body.username; 

    if (Username == "" || Username == null || userUsername == "" || userUsername == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid username."
       
        })
    }   
    else 
    {
        let query = `SELECT username FROM users_tbl WHERE username = '${Username}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length === 0) 
                {
                    // User already exists
                    res.status(400).json(
                        {
                            successful: false,
                            message: "The username you mentioned already exists in our records."
                        })
                }
                if (rows.length > 0) 
                {
                    let updateQuery = `UPDATE users_tbl SET username = '${userUsername}' WHERE username = '${Username}'`
                    database.user_db.query(updateQuery, (err, rows, result) => 
                    {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}
const updatePassword = (req, res, next) => 
{
    let userUsername = req.params.username;
    let userPassword = req.body.password;

    if (userUsername == "" || userUsername == null || userPassword == "" || userPassword == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid password."

            
        })
    }   
    else 
    {
        let query = `SELECT password FROM users_tbl WHERE username = '${userUsername}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length == 0) {
                    let updateQuery = `UPDATE users_tbl SET password = '${userPassword}' WHERE username = '${userUsername}'`
                    database.user_db.query(updateQuery, (err, rows, result) => {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}
const updatefirstName = (req, res, next) => 
{
    let userUsername = req.params.username;
    let userfirstName = req.body.firstName;

    if (userUsername == "" || userUsername == null || userfirstName == "" || userfirstName == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid Name."

            
        })
    }   
    else 
    {
        let query = `SELECT firstName FROM users_tbl WHERE username = '${userUsername}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) {
                    let updateQuery = `UPDATE users_tbl SET firstName = '${userfirstName}' WHERE username = '${userUsername}'`
                    database.user_db.query(updateQuery, (err, rows, result) => {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}
const updatelastName = (req, res, next) => 
{
    let userUsername = req.params.username;
    let userlastName = req.body.lastName;

    if (userUsername== "" || userUsername == null || userlastName == "" || userlastName == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid Last Name."

            
        })
    }   
    else 
    {
        let query = `SELECT lastName FROM users_tbl WHERE username = '${userUsername }'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) 
                {
                    let updateQuery = `UPDATE users_tbl SET lastName = '${userlastName}' WHERE username = '${userUsername }'`
                    database.user_db.query(updateQuery, (err, rows, result) => 
                    {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}
const updateAge = (req, res, next) => 
{
    let userUsername = req.params.username;
    let userAge = req.body.age;

    if (userUsername == "" || userUsername == null || userAge == "" || userAge == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid Age."    
        })
    }   
    else 
    {
        let query = `SELECT age FROM users_tbl WHERE username = '${userUsername}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) {
                    let updateQuery = `UPDATE users_tbl SET age = ${userAge} WHERE username = '${userUsername}'`
                    database.user_db.query(updateQuery, (err, rows, result) => 
                    {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}
const updateBirthday = (req, res, next) => 
{
    let userUsername = req.params.username;
    let userBirthday = req.body.birthday;

    if (userUsername == "" || userUsername == null || userBirthday  == "" || userBirthday  == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid Birthday."

            
        })
    }   
    else 
    {
        let query = `SELECT birthday FROM users_tbl WHERE username = '${userUsername}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) 
                {
                    let updateQuery = `UPDATE users_tbl SET birthday = '${userBirthday}' WHERE username = '${userUsername}'`
                    database.user_db.query(updateQuery, (err, rows, result) => 
                    {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}
const updateContact = (req, res, next) => 
{
    let userUsername = req.params.username;
    let userContact = req.body.contact;

    if (userUsername == "" || userUsername == null || userContact  == "" || userContact  == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid contact number."

            
        })
    }   
    else 
    {
        let query = `SELECT contact FROM users_tbl WHERE username = '${userUsername}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) 
                {
                    let updateQuery = `UPDATE users_tbl SET contact = '${userContact}' WHERE username = '${userUsername}'`
                    database.user_db.query(updateQuery, (err, rows, result) => 
                    {
                        if (err) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: err
                            })
                        } 
                        else 
                        {
                            res.status(200).json(
                            {
                                successful: true,
                                message: "The information has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We do not have the user information you are referring to."
                    })
                }
            }
        })
    }
}

//delete
const deleteUser = (req, res, next) =>
{
    let userUsername = req.params.username;

    if(userUsername == "" || userUsername == null)
    {
        res.status(404)(
            {
            successful: false,
            message: "We do not have a user with the provided username. Please enter a valid username."
            })
    }
    else
    {
        let query =`SELECT username FROM users_tbl WHERE username = '${userUsername}'`

        database.user_db.query(query, (err, rows, result)=>
        {
            if(err)
            {
                res.status(500).json(
                    {
                    successful: false,
                    message: err
                    })
            }
            else
            {
                if (rows.length > 0)
                {
                    //ALLOW DELETION OF PRODUCT SINCE IT EXIST IN THE DB
                    let deleteQuery = `DELETE FROM users_tbl WHERE username = '${userUsername}'`
                    
                    database.user_db.query(deleteQuery, (err, rows, result)=>
                    {
                        if (err)
                        {
                            res.status(500).json(
                                {
                                successful: false,
                                message: err
                                })
                        }
                        else{
                            res.status(200).json(
                                {
                                    successful: true,
                                    message: "The user has been successfully removed."
                                })
                        }
                    })
                }
                else
                {
                res.status(400).json(
                    {
                    successful: false,
                    message: "Please provide a valid ID."
                    })
                }
            }
        })
    }
}

//login
const login = (req, res, next) => 
{
    let userUsername = req.body.username;
    let userPassword = req.body.password;

    if (userUsername === "" || userUsername === null || userPassword === "" || userPassword === null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid username, and a valid password."
        })
    } 
    else 
    {
        let query = `SELECT username, password, firstName, lastName FROM users_tbl WHERE username = '${userUsername}'`
        database.user_db.query(query, (err, rows, result) => 
        {
            if (err) 
            {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                });
            } else {
                if (rows.length === 1 && rows[0].username === userUsername && rows[0].password === userPassword) 
                {
                    const { firstName, lastName } = rows[0]
                    res.status(200).json({
                      successful: true,
                      message: "Login successful",
                      welcomeMessage: `Welcome ${firstName} ${lastName}!`,
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "Wrong username or password, please try logging in again"
                    })
                }
            }
        })
    }
}
      
module.exports = 
{
    addUser,//add
    viewAllUser,//view
    
    //updates
    updateUsername,
    updatePassword,
    updatefirstName,
    updatelastName,
    updateAge,
    updateBirthday,
    updateContact,

    deleteUser,//delete
    login//login
}