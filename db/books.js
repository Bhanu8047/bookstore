const db = require('./connectDB')
const util = require('util')
const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='books'`

const insertBook = ({ bookName, authorName, price}, callback)=>{
    db.each(sql, (err,row) => {
    
        if(err){
            return console.error(err.message)
        } 
        const insertion = db.prepare("INSERT INTO books (name,author,price) values (?,?,?)")
        insertion.run(bookName,authorName, price, (err)=> {
            if(err){
                callback(err.message)
                return console.error(err.message)
            }
        })
        insertion.finalize((err)=> {
            if(err){
                callback(err.message)
                return console.error(err.message)
            }
        })
        callback("Data inserted sucessfully!")
    })
}
const getBooks = (callback)=> {
    db.serialize(()=>{
        db.all("SELECT * FROM books", (err, rows)=> {
            if(err){
                console.error(err.message)
                callback(err)
            }
            callback(rows)
        })
    })   
}

// up = [
//     {
//         attribute: "name",
//         value: "DragonZ"
//     },
//     {
//         attribute: "price",
//         value: 50
//     }
// ]

const updateBook = (id, updates, callback)=> {
    db.serialize(()=> {
        updates.forEach(element => {
            
            db.run("UPDATE books SET "+element.attribute+" = '"+element.value+"' WHERE id = "+id, (err) => {
                if(err){
                    console.error(err.message)
                    callback(err.message)
                }
                callback("Updated sucessfully")
            })
        })
    })
}

const deleteBook = (id ,callback) => {
    db.each(sql, (err, row) => {
        if(err){
            return console.error(err.message)
        }
        const deletion = db.prepare("DELETE FROM books WHERE id = ?")
        deletion.run(id, err => {
            if(err){
                callback(err.message)
                return console.error(err.message)
            }
        })
        deletion.finalize(err => {
            if(err){
                callback(err.message)
                return console.error(err.message)
            }
        })

        callback("Deleted successfully")
    })
}

module.exports = {
    insertBook,
    deleteBook,
    getBooks,
    updateBook
}