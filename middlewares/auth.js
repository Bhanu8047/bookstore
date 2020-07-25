// Middlewares
const auth = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login')
    } else {
        next()
    }
}

const redirect = (req, res, next) => {
    if(req.session.userId){
        res.redirect('/user')
    } else {
        next()
    }
}

module.exports = {
    auth,
    redirect
}