// Middlewares
const auth = (req, res, next) => {
    if(!req.session.userId){
        if(req.session.admin === true){
            res.redirect('/login')
        }
        
    } else {
        next()
    }
}

const redirect = (req, res, next) => {
    if(req.session.userId){
        if(req.session.admin === false){
            res.redirect('/user')
        }
        
    } else {
        next()
    }
}

const admin = (req, res, next) => {
    if(!req.session.userId){
        if(req.session.admin === false){
            res.redirect('/admin/login')
        }
    } else {
        next()
    }
}

const adminRedirect = (req, res, next) => {
    if(req.session.userId && req.session.admin === true){
        res.redirect('/admin')
    } else {
        next()
    }
}

module.exports = {
    auth,
    redirect,
    admin,
    adminRedirect
}