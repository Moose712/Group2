const order_model = (user, item, qty, dateOrdered, status)=>{

    let Order = {
        user_id: user,
        item_id: item,
        quantity: qty,
        dateOrdered: dateOrdered,
        statusID: status
    }
        //left side, column name in the data base
        //right side, holds variables only, come from the client request
    return Order
}

module.exports = {
    order_model
}