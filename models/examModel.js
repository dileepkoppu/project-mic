const mongoose = require('mongoose')
const schema =mongoose.Schema


const exam_schema = new schema({
    "title":{
        type:String,
        required:true,
        trim: true,
        unique:true
    },
    "cName":{
        type:String,
        required:true,
        trim: true
    },
    "imgLink":{
        type:String,
        required:true,
        trim: true
    },
    "description":{
        type:String,
        required:true,
        trim: true,
        minLength:3
    },
    "totalNoOfQ":{
        type:Number,
        required:true,
        trim: true,
    }
})

exam=mongoose.model('Exam',exam_schema)
module.exports = exam