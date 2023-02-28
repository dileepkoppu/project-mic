const mongoose = require('mongoose')
const schema =mongoose.Schema


const user_schema = new schema({
    "id":{
        type:String,
        required:true,
        trim: true
    },
    "firstName":{
        type:String,
        required:true,
        trim: true,
        minLength:3
    },
    "lastName":{
        type:String,
        required:true,
        trim: true,
        minLength:3
    },
    "Branch":{
        type:String,
        required:true,
        trim: true,
        minLength:2
    },
    "passOutYear":{
        type:String,
        required:true,
        trim: true,
        Length:4
    },
    "cName":{
        type:String,
        required:true,
        trim: true,
        minLength:3
    },
    "totalRounds":{
        type:Number,
        required:true,
        trim: true
    },
    "currentRound":{
        type:Number,
        required:true,
        trim: true
    },
    "status":{
        type:Boolean,
        required:true
    }
})

studentc=mongoose.model('StudentC',user_schema)
module.exports = studentc