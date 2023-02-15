const mongoose = require('mongoose')
const schema =mongoose.Schema

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const user_schema = new schema({
    "id":{
        type:String,
        required:true,
        trim: true,
        unique:true,
    },
    "email": {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true,'email is exist'],
        required:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    "role_ids": {
        type: String,
        enum: ["superuser","user"],
        required:true
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
    "mobile": {
        type:String,
        trim:true,
        Length:10,
    },
    "salt": {
        type : String,
        required:true,
        trim: true,
    },
    "hash": {
        type : String,
        required:true,
        trim: true,
    },
    "authToken":String,
})



user=mongoose.model('User',user_schema)
module.exports = user