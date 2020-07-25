const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('db/data.db', sqlite3.OPEN_READWRITE ,err => {
    if(err){
        return console.error(err.message)
    }
    console.log('Connected sucessfully!')
})

module.exports = db