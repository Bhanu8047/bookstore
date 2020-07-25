const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { insertBook, deleteBook, getBooks, updateBook } = require('../../db/books')
const session = require('express-session')
const { admin, adminRedirect } = require('../../middlewares/auth')
const { addAdmin , getAdmin, findAdmin, getAdminId } = require('../../db/admin')


// admin session
const HALF_HOUR = 1000 * 60 * 60 * 0.5
const  {
    SESS_LIFETIME = HALF_HOUR,
    SESS_NAME = 'sidadmin',
    SESS_SECRET = 'thisisanewsession',
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
        secure : IN_PROD,
    }
}))


router.get('/admin', admin, (req, res)=> {
    // res.send(req.session)
    const books = getBooks(books=>{
        return books
    })
    res.render('dashboard', {
        id: req.session.userId,
        name: req.session.name,
        username: req.session.username,
        books
    })
})

router.get('/admin/login', adminRedirect , (req,res)=>{
    res.render('admin', {
        title: 'Admin login',
        page_title: 'Login to Admin'
    })
})

router.post('/admin/login', adminRedirect ,(req,res)=> {
    getAdmin(req.body, admin=> {
        if(admin){
            req.session.userId = admin.id
            req.session.name = admin.name
            req.session.username = admin.username
            req.session.admin = true
            return res.redirect('/admin')
        } else {
            return res.redirect('/admin/login')
        }
    })
})

router.post('/admin/logout', admin, (req, res)=> {
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/admin')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/')
    })
})


module.exports = router