const mongoose = require('mongoose')
const schema =mongoose.Schema



const question_schema = new schema({
    "question":{
        type:String,
        required:true,
        trim: true
    },
    "options": {
        type:Array,
        required:true
    },
    "Ans":{
        type:String,
        required:true,
        trim: true
    },
    "exam_id": {
        type: String,
        trim: true
    }
})

question=mongoose.model('Question',question_schema)
module.exports = question