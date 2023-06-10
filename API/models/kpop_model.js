const kpop_model = (name, brand, price, qty)=>{

    let Item = {
        item_name: name,
        item_brand: brand,
        item_price: price,
        item_qty: qty
        
    }
        //left side, column name in the data base
        //right side, holds variables only, come from the client request
    return Item
}

module.exports = {
    kpop_model
}