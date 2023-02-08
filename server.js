const appRoot=require("app-root-path")
const express = require('express')
const cors = require("cors")

const userRoutes = require(appRoot+'/routes/userRoutes')
const recordRoutes = require(appRoot+'/routes/recordRoutes')



const Port = process.env.PORT||9000
const app = express()


require('dotenv').config()

const uri = process.env.DB_URL||'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.4mifl.mongodb.net/project-mic?retryWrites=true&w=majority'

// db
// ----------------------------------------------------------------------

require(appRoot+"/helpers/mongodbHelper.js").database(uri)


// ---------------------------------------------------


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use(express.static(appRoot+'/public'));
// app.use('',express.static(appRoot+"/static"))
// app.use('/upload',express.static(appRoot+'/uploads'));


app.use('',userRoutes.router)

app.use('',recordRoutes.router)



app.listen(Port,() => {
    console.log(`Server started on localhost:${Port}`)
}) 