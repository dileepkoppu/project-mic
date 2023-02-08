const appRoot =require("app-root-path");
const e = require("cors");
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv');


const recordModel = require(appRoot+"/models/recordModel.js")
const parse = require('csv-parse').parse
const json2csv = require("json2csv").Parser;

createRecord= async(req,res)=>{
  try {
    if (req.jwt.role==="superuser"){
      const file = req.file
      const data = fs.readFileSync(file.path)
      parse(data, (err, records) => {
        if (err) {
          console.error(err)
          res.status(400).json({success: false, message: 'An error occurred'})
        }

        result = records.map(record => ({id:record[0],firstName:record[1],lastName:record[2],Branch:record[3],passOutYear:record[4],cName:record[5]}))
        fs.rmSync(file.path)
        recordModel.insertMany(result)
                .then((report)=>{
                                  res.status(200).send({success:true,})
                                })
                                .catch((error)=>{
                                  res.status(500).send({success:false,"message":error})
                                })
                              })
    }else{
      res.status(401).send({success:false,message:"You are not authorized to visit this route"})
  }} catch (error) {
    res.status(400).json({success:false,"message":"something went wrong please try again"})
    
  }
}

recordDownload = async(req,res)=>{
  try {
    if (req.jwt.role==="superuser") {
      querys=req.query
      data = await recordModel.find(querys,{_id:0,__v:0})
      f=[]
      data.forEach(element => {
        f.push({id:element['id'],firstName:element['firstName'],lastName:element['lastName'],Branch:element['Branch'],passOutYear:element['passOutYear'],cName:element['cName']})
      });
      const json2csvParser = new json2csv({ header: true });
      const csvData = json2csvParser.parse(f);
      fs.writeFileSync(appRoot+"/uploads/users.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write to fs.csv successfully!");
      });
      res.download(appRoot+"/uploads/users.csv","data.csv")
    } else {
      res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
    }
  } catch (error) {
    res.status(400).json({success:false,"message":"something went wrong please try again"})
  }
}


recordList = async(req,res)=>{
  try {
      query= req.query  
      recordModel.find(query)
                  .then((data)=>{
                              res.status(200).send({success: true,data:data})   
                          })
                          .catch((error)=>{
                               res.status(503).send({success: false,message:"somting went worng please try again"})
                          })
  } catch (error) {
       res.status(500).send({success:flase,message:"somting went worng please try again"})
  }
}

module.exports.createRecord =createRecord
module.exports.download =recordDownload
module.exports.recordList =recordList