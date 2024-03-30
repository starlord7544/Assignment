const app = require('./app')
const mongoose = require('mongoose')

const port = 1400

const url = "mongodb+srv://<username>:<password>@<database>.cup2spz.mongodb.net/"
//  mongodb+srv://starlord7544:starlord7544@cluster0.cup2spz.mongodb.net/ 
const userName = "starlord7544"
const password = "starlord7544"
const DataBase = "cluster0"

const db_url = url.replace('<username>', userName).replace('<password>', password).replace('<database>' , DataBase)
mongoose.connect(db_url).then((con)=>{
    console.log('-------------Connected to Database------------')
})

app.listen (port, ()=> {
    console.log('________________Server Started________________')
}) 