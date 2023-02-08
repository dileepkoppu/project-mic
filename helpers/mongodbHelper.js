const appRoot = require('app-root-path');
const mongoose = require('mongoose')
const saveUsers = require(appRoot+"/helpers/defaultUsers")
database=(url)=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(url,{useNewUrlParser :true,useUnifiedTopology: true});
    mongoose.connection
      .once('open',() => {
            console.log('connected')
            saveUsers()
      })
      .on('error', error=>
            {console.log("your error", error);});
}

module.exports.database = database