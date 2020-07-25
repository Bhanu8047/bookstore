const db = require('./connectDB')

const table = ()=> {
    // Creating the table books
let sql = `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR2(30) NOT NULL, author VARCHAR2(30) NOT NULL, price FLOAT NOT NULL)`
db.serialize( () => {
    db.run(sql, err => {
        if(err){
            return err
        }
        console.log('Created table sucessfully!!')
    })
})

// Creating the table user
sql = `CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR2(30) NOT NULL, username VARCHAR2(30) NOT NULL, password VARCHAR2(30) NOT NULL)`
db.serialize( () => {
    db.run(sql, err => {
        if(err){
            return err
        }
        console.log('Created table sucessfully!!')
    })
})

// creating table admin

sql = `CREATE TABLE admin (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR2(30) NOT NULL, username VARCHAR2(30) NOT NULL UNIQUE, password VARCHAR2(30) NOT NULL)`

db.serialize( ()=> {
    db.run(sql, err=>{
        if(err){
            return err
        }
        console.log('Created Admin table sucessfully')
    })
})

// db.close((err)=> {
//     if(err){
//         return console.error(err.message)
//     }
//     console.log('Closed the database connection, please reopen')
// })
}

module.exports = table