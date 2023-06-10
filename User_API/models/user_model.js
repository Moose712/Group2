const user_model = (username, password, firstName, lastName, age, birthday, contact)=>{

    let User = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age,
        birthday: birthday,
        contact: contact,
        
        
    }
        //left side, column name in the data base
        //right side, holds variables only, come from the client request
    return User
}

module.exports = {
    user_model
}