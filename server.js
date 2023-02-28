const appRoot=require("app-root-path")
const express = require('express')
const cors = require("cors")

const userRoutes = require(appRoot+'/routes/userRoutes')
const recordRoutes = require(appRoot+'/routes/recordRoutes')
const studendCRoutes = require(appRoot+'/routes/studendCRoutes')
const examRoutes = require(appRoot+'/routes/examRoutes')
const questionRoutes = require(appRoot+'/routes/questionRoutes')


require('dotenv').config()

const app = express()



const Port = process.env.PORT||9000
const uri = process.env.DB_URL||'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.4mifl.mongodb.net/project-mic?retryWrites=true&w=majority'

// db
// ----------------------------------------------------------------------

require(appRoot+"/helpers/mongodbHelper.js").database(uri)


// ---------------------------------------------------


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use(express.static(appRoot+'/public'));



app.use('',userRoutes.router)

app.use('',recordRoutes.router)

app.use('',studendCRoutes.router)

app.use('',examRoutes.router)

app.use('',questionRoutes.router)



app.listen(Port,() => {
    console.log(`Server started on localhost:${Port}`)
}) 