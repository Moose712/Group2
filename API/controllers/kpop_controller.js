const database = require('../models/connection_db')
const kpopModel = require('../models/kpop_model')
//add
const addItem = (req, res, next)=>{

    let itemName = req.body.name; 
    let itemBrand = req.body.brand;
    let itemPrice = req.body.price;
    let kpopQty = req.body.qty;

    if (itemName == "" || itemName == null || itemPrice == "" || itemPrice == null)
    {
        res.status(404).json(
        {
            successful: false,
            message: "Please provide a name or indicate the price of the item."
        })
    }
    else
    {
    let insertQuery = `INSERT INTO merch_tbl SET ?`
    let kpopObj = kpopModel.kpop_model(itemName, itemBrand, itemPrice, kpopQty)

        database.db.query(insertQuery, kpopObj, (err, rows, result)=>
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
                    message: "The item has been successfully added."
                })
            }

        })
    }
}
       
    



//view
const viewAllProducts = (req, res, next)=>{
    let query = `SELECT * FROM merch_tbl`
    database.db.query(query, (err, rows, result)=>{
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
              message: "At the moment, we do not have any items available."
            })
        } 
        else 
        {
            res.status(200).json(
            {
                successful: true,
                message: "Here is a list of the available items:",
                count: count,
                data: rows
            })
        }   
    }
})
}
const viewAllProductsKeyword = (req, res, next) => 
{
    const keyword = req.body.keyword;
  
    let query = `SELECT * FROM merch_tbl`
  
    if (keyword) 
    {
      query += ` WHERE item_name LIKE '%${keyword}%'`
    }
  
    database.db.query(query, (err, rows) => 
    {
      if (err) 
      {
        return res.status(500).json(
        {
          successful: false,
          message: err,
        });
      } else {
        const count = rows.length;
  
        if (count === 0) {
          return res.status(200).json({
            successful: true,
            message: "At the moment, we do not have any items available.",
          });
        } else {
          return res.status(200).json({
            successful: true,
            message: "Here is a list of the available items:",
            count: count,
            data: rows,
          });
        }
      }
    });
  }
//updates
const updatePrice = (req, res, next) => {
    let kpopId = req.params.id;
    let kpopPrice = req.body.price;

    if (kpopId == "" || kpopId == null || kpopPrice == "" || kpopPrice == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid ID or specify the price of the item."

            
        })
    }   
    else 
    {
        let query = `SELECT item_id, item_price FROM merch_tbl WHERE item_id = ${kpopId}`
        database.db.query(query, (err, rows, result) => {
            if (err) {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) {
                    let updateQuery = `UPDATE merch_tbl SET item_price = '${kpopPrice}' WHERE item_id = ${kpopId}`
                    database.db.query(updateQuery, (err, rows, result) => {
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
                                message: "The item has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We are currently out of stock."
                    })
                }
            }
        })
    }
}
const updateQuantity = (req, res, next) => {
    let kpopId = req.params.id;
    let kpopQty = req.body.qty;

    if (kpopId == "" || kpopId == null || kpopQty == "" || kpopQty == null) 
    {
        res.status(400).json(
        {
            successful: false,
            message: "Please provide a valid ID or specify the quantity."

            
        })
    }   
    else 
    {
        let query = `SELECT item_id, item_qty FROM merch_tbl WHERE item_id = '${kpopId}'`
        database.db.query(query, (err, rows, result) => {
            if (err) {
                res.status(500).json(
                {
                    successful: false,
                    message: err
                })
            } 
            else 
            {
                if (rows.length > 0) {
                    let updateQuery = `UPDATE merch_tbl SET item_qty = ${kpopQty} WHERE item_id = ${kpopId}`
                    database.db.query(updateQuery, (err, rows, result) => {
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
                                message: "The item has been successfully updated."
                            })
                        }
                    })
                } 
                else 
                {
                    res.status(400).json(
                    {
                        successful: false,
                        message: "We are currently out of stock for the item you inquired about.."
                    })
                }
            }
        })
    }
}
//delete
const deleteItem = (req, res, next) =>{
    let kpopId = req.params.id

    if(kpopId == "" || kpopId == null){
        res.status(404)({
            successful: false,
            message: "We do not have that particular item available."
        })
    }
    else
    {
        let query =`SELECT item_id FROM merch_tbl WHERE item_id = ${kpopId}`

        database.db.query(query, (err, rows, result)=>{
            if(err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }
            else
            {
                if (rows.length > 0){
                    //ALLOW DELETION OF PRODUCT SINCE IT EXIST IN THE DB
                    let deleteQuery = `DELETE FROM merch_tbl WHERE item_id = ${kpopId}`
                    
                    database.db.query(deleteQuery, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful: false,
                                message: err
                            })
                        }
                        else{
                            res.status(200).json({
                                successful: true,
                                message: "The item has been successfully deleted."
                            })
                        }
                    })
                }
                else
                {
                        res.status(400).json({
                        successful: false,
                        message: "Please provide a valid ID."
                    })
                }
            }
        })
    }
}

module.exports = {
    addItem,//add
    viewAllProducts,//view
    viewAllProductsKeyword,

    //update
    updatePrice,
    updateQuantity,

    deleteItem//delete
}