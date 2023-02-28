const mongoose = require('mongoose')
const schema =mongoose.Schema


const examS_schema = new schema({
    "title":{
        type:String,
        required:true,
        trim: true
    },
    "name":{
        type:String,
        required:true,
        trim: true
    },
    "cName":{
        type:String,
        required:true,
        trim: true
    },
    "exam_id":{
        type:String,
        required:true,
        trim: true
    },
    "q_list":{
        type:Array,
        required:true
    },
    "score":{
        type:Number,
        required:true,
        trim: true,
    },
    "totalNoOfQ":{
        type:Number,
        required:true,
        trim: true,
    }
})

examS=mongoose.model('Test',examS_schema)
module.exports = examS