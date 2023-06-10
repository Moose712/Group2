const database = require('../model/order_connection_db');
const orderModel = require('../model/order_model');

const createOrder = (req, res, next) => 
{
    let user = req.body.username;
    let item = req.body.item_id;
    let qty = req.body.qty;
    let dateOrdered = req.body.dateOrdered;
    let status = req.body.statusID;

    // Validate inputs
    if (!user || !item || !qty) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid username, item ID, and quantity."
        })
    } 
    else 
    {
        // Check if user exists and KPOP item exists
        let query = `SELECT * FROM users_tbl WHERE username = '${user}'`
        database.ord_db.query(query, (err, userRows) => 
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
                if (userRows.length === 0) 
                {
                    res.status(404).json(
                    {
                        successful: false,
                        message: "User not found."
                    })
                } 
                else 
                {
                    let kpopQuery = `SELECT * FROM merch_tbl WHERE item_id = ${item}`
                    database.ord_db.query(kpopQuery, (kpopErr, kpopRows) => 
                    {
                        if (kpopErr) 
                        {
                            res.status(500).json(
                            {
                                successful: false,
                                message: kpopErr
                            })
                        } 
                        else 
                        {
                            if (kpopRows.length === 0) 
                            {
                                res.status(404).json(
                                {
                                    successful: false,
                                    message: "KPOP item not found."
                                })
                            } 
                            else 
                            {
                                // Create order in the database
                                if (qty <= kpopRows[0].item_qty) 
                                {
                                    let insertQuery = `INSERT INTO orders_tbl (username, item_id, quantity, dateOrdered, statusID) VALUES ('${user}', ${item}, ${qty}, '${dateOrdered}', ${status})`
                                    database.ord_db.query(insertQuery, (insertErr) => 
                                    {
                                        if (insertErr) 
                                        {
                                            res.status(500).json(
                                            {
                                                successful: false,
                                                message: insertErr
                                            })
                                        } 
                                        else 
                                        {
                                            res.status(200).json(
                                            {
                                                successful: true,
                                                message: "Order created successfully."
                                            })
                                        }
                                    });
                                } 
                                else 
                                {
                                    res.status(404).json(
                                    {
                                        successful: false,
                                        message: "Not sufficient stock."
                                    })
                                }
                            }
                        }
                    })
                }
            }
        })
    }
}

const viewAllOrder = (req, res, next) => 
{
    let query = `SELECT users_tbl.firstName,
                    users_tbl.lastName,
                    users_tbl.contact,
                    users_tbl.age,
                    users_tbl.birthday,
                    merch_tbl.item_name,
                    merch_tbl.item_price,
                    (merch_tbl.item_price * orders_tbl.quantity) AS total_price
                FROM orders_tbl
                INNER JOIN merch_tbl ON orders_tbl.item_id = merch_tbl.item_id
                INNER JOIN users_tbl ON orders_tbl.username = users_tbl.username`;

    database.ord_db.query(query, (err, rows) => 
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
            const count = rows.length
            if (count === 0) 
            {
                res.status(200).json(
                {
                    successful: true,
                    message: "There are no orders yet!"
                })
            } 
            else 
            {
                res.status(200).json(
                {
                    successful: true,
                    message: "Here is the list of orders made:",
                    count: count,
                    data: rows
                })
            }
        }
    })
}

const viewOrder = (req, res, next)=>
{
    let orderId = req.params.id

    let query = `SELECT users_tbl.lastName,
                        users_tbl.firstName,
                        users_tbl.contact,
                        users_tbl.age,
                        users_tbl.birthday,
                        merch_tbl.item_name,
                        merch_tbl.item_price,
                        (merch_tbl.item_price * orders_tbl.quantity) total_price
                FROM orders_tbl
                INNER JOIN merch_tbl ON orders_tbl.item_id = merch_tbl.item_id
                INNER JOIN users_tbl ON orders_tbl.username = users_tbl.username
                WHERE orders_tbl.order_id = ${orderId}`

    database.ord_db.query(query, (err, rows, result)=>
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
                    message: "There is no order yet"
                })
            } 
            else 
            {
                res.status(200).json(
                {
                    successful: true,
                    message: "Here are the list of the orders made:",
                    count: count,
                    total_price: rows[0].total_price,
                    data: rows
                })
            }   
        }
    })
}

//updates

const updateItem = (req, res, next) => 
{
    let orderId = req.params.id;
    let statusId = req.body.statusID;

    // Validate inputs
    if (statusId == "" || statusId == null || orderId == "" || orderId == null) 
    {
        res.status(400).json( 
        {
            successful: false,
            message: "Please provide a valid Status ID."
        })
    } 
    else 
    {
        // Check if order exists
        let orderQuery = `SELECT item_id, quantity FROM orders_tbl WHERE order_id = ${orderId}`;
        database.ord_db.query(orderQuery, (err, orderRows) => 
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
                if (orderRows.length === 0) 
                {
                    res.status(404).json(
                    {
                        successful: false,
                        message: "Order not found."
                    })
                } 
                else 
                {
                    // Check if item exists and has sufficient quantity
                    let itemQuery = `SELECT item_qty FROM merch_tbl WHERE item_id = ${orderRows[0].item_id}`
                    database.ord_db.query(itemQuery, (err, itemRows) => 
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
                            if (itemRows.length === 0) 
                            {
                                res.status(404).json(
                                {
                                    successful: false,
                                    message: "Item not found."
                                })
                            } 
                            else 
                            {
                                if (itemRows[0].item_qty >= orderRows[0].quantity) 
                                {
                                    // Update order in the database
                                    let updateQuery = `UPDATE orders_tbl SET statusID = ${statusId} WHERE order_id = ${orderId}`
                                    database.ord_db.query(updateQuery, (updateErr) => 
                                    {

                                        if (updateErr) 
                                        {
                                            if(updateErr.code == "ER_NO_REFERENCED_ROW_2")
                                            {
                                                res.status(500).json(
                                                {
                                                    successful: false,
                                                    message: "Invalid Status ID"
                                                })
                                            }
                                            else
                                            {
                                                res.status(500).json(
                                                {
                                                    successful: false,
                                                    message: updateErr
                                                })
                                            }
                                        } 
                                        else 
                                        {
                                            res.status(200).json(
                                            {
                                                successful: true,
                                                message: "Order updated successfully."
                                            })
                                        }
                                    })
                                } 
                                else 
                                {
                                    res.status(400).json(
                                        {
                                        successful: false,
                                        message: "Insufficient item quantity."
                                    })
                                }
                            }
                        }
                    })
                }
            }
        })
    }
}


module.exports = 
{
    createOrder,
    viewAllOrder,
    viewOrder,

    //update
    updateItem

   
}
