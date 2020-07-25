const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { addUser, getUser, findUser, getId } = require('../../db/user')
const { insertBook, deleteBook, getBooks, updateBook } = require('../../db/books')
const session = require('express-session')
const { auth, redirect } = require('../../middlewares/auth')

const TWO_HOURS = 1000 * 60 * 60 * 2
const  {
    SESS_LIFETIME = TWO_HOURS,
    SESS_NAME = 'sid',
    SESS_SECRET = 'keepthisasecret',
    NODE_ENV = 'development'
} = process.env

const IN_PROD = NODE_ENV === 'production'

router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure : IN_PROD
    }
}))



// user Routes
router.get('/user', auth, (req, res) => {
    // console.log(req.session) 
    let { userId } = req.session
    // userId = 1
    // userId ? res.send(req.session) : res.send({
    //     message: "unauthenticated!"
    // })
    getBooks(books=>{
        // console.log(books)
        res.render('user', {
            id: req.session.userId,
            name: req.session.name,
            username: req.session.username,
            books
        })
    })
    
    
})

router.get('/login', redirect, (req,res)=> {
    res.render('login', {
        title: "Books: Login/Signup",
        page_title: "Login to Bookstore"
    })
})

router.get('/signup', redirect, (req,res)=> {
    res.render('signup', {
        title: "Books: Login/Signup",
        page_title: "Signup to goto Bookstore"
    })
})

router.post('/login', redirect, (req, res)=> {
    getUser(req.body, user => {
        try {
            if(user){
                req.session.userId = user.id
                req.session.name = user.name
                req.session.username = user.username
                return res.redirect('/user')
                // res.send({
                //     user,
                //     message: "Successfully Authenticated!"
                // })
            } else {
                // res.send({
                //     message: "Invalid Credentials"
                // })
                return res.redirect('/login')
            }
        } catch(e){
            res.send(e)
        }  
    })
})

router.post('/signup', redirect, (req, res)=> {
    const {name, username, password} = req.body
    let message
    if(name && username && password){
        findUser(username, user => {
            if(!user){
                addUser(req.body, result => {
                    message = result
                })
                getId(id=>{
                    req.session.userId = id
                })
                req.session.name = name
                req.session.username = username
                return res.status(200).redirect('/user')
            } else {
                res.redirect('/signup')
            }
        })
    }
    
})

router.post('/user/logout', auth, (req, res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/user')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/')
    })
})

module.exports = router