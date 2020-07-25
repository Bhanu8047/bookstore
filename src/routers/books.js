const express = require('express')
const router = express.Router()
const { insertBook, deleteBook, getBooks, updateBook } = require('../../db/books')
const { auth } = require('../../middlewares/auth')

// Routes
const book = {
    bookName: 'Dragon12',
    authorName: 'BhanuJ',
    price: 412.50
}

router.get('/getBooks/all', auth, (req, res)=> {
    getBooks((books)=>{
        res.send({
            books
        })
    })  
})

module.exports = router