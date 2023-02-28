const mongoose = require('mongoose')
const schema =mongoose.Schema

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };


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
})

record=mongoose.model('Record',user_schema)
module.exports = record