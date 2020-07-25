const db = require('./connectDB')

const addUser = ({name, username, password}, callback)=>{
    const add = db.prepare("INSERT INTO user (name, username, password) values (?, ?, ?)")
    add.run(name, username, password, err => {
        if(err){
            return callback(err.message) 
        }
    })
    add.finalize(err => {
        if(err){
            return callback(err.message)
        }
    })

    callback("Data inserted sucessfully")
}

const getUser = ({username, password}, callback) => {
    db.get("SELECT * FROM user WHERE username = '"+username+"' AND password = '"+password+"'", (err,row)=>{
        if(err){
            return callback(err.message)
        }
        callback(row)
    })
}

const findUser = (username, callback) => {
    db.get("SELECT * FROM user WHERE username = '"+username+"'" , (err, row)=>{
        if(err){
            return callback(err.message)
        } else {
            callback(row)
        }
    })
}

const getId = (callback)=>{
    db.get("SELECT MAX(id) as id FROM user", (err, row)=>{
        if(err){
            callback(err.message)
        } else {
            callback(row)
        }
    })
}

module.exports = {
    addUser,
    getUser,
    findUser,
    getId
}