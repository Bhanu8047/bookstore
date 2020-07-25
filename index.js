const app = require('./src/app')
const table = require('./db/table')

const PORT = process.env.PORT || 8000

try {
    table()
}catch(e){
    console.log(e)
}

// Landing Page
app.get('/', (req, res) => {
    // console.log(req.session)
    res.render('index', {
        title: "BookStore",
        author: "Bhanu Pratap"
    })
})

// 404
app.get('*',(req,res)=>{
    res.render('404', {
        
    })
})

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})