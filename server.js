const appRoot=require("app-root-path")
const express = require('express')
const cors = require("cors")



require('dotenv').config()

const uri = process.env.DB_URL||'mongodb://localhost/project-mic'


const Port = process.env.PORT||9000
const app = express()