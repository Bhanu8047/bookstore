const db = require('./connectDB')

const addAdmin = ({name, username, password}, callback)=>{
    const add = db.prepare("INSERT INTO admin (name, username, password) values (?, ?, ?)")
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

const getAdmin = ({username, password}, callback) => {
    db.get("SELECT * FROM admin WHERE username = '"+username+"' AND password = '"+password+"'", (err,row)=>{
        if(err){
            return callback(err.message)
        }
        callback(row)
    })
}

const findAdmin = (username, callback) => {
    db.get("SELECT * FROM admin WHERE username = '"+username+"'" , (err, row)=>{
        if(err){
            return callback(err.message)
        } else {
            callback(row)
        }
    })
}

const getAdminId = (callback)=>{
    db.get("SELECT MAX(id) as id FROM admin", (err, row)=>{
        if(err){
            callback(err.message)
        } else {
            callback(row)
        }
    })
}

module.exports = {
    addAdmin,
    getAdmin,
    findAdmin,
    getAdminId
}