const appRoot =require("app-root-path");
const fs = require('fs')

const recordModel = require(appRoot+"/models/recordModel.js")
const parse = require('csv-parse').parse
const json2csv = require("json2csv").Parser;

createRecord= async(req,res)=>{
  try {
    if (req.jwt.role==="superuser" && req.file){
      const file = req.file
      const data = fs.readFileSync(file.path)
      parse(data, async (err, records) => {
        if (err) {
          console.error(err)
          res.status(400).json({success: false, message: 'An error occurred'})
        }
        result = records.map(record => ({id:record[0],firstName:record[1],lastName:record[2],Branch:record[3],passOutYear:record[4],cName:record[5]}))
        fs.rmSync(file.path)
        await recordModel.insertMany(result)
        recordModel.find()
                .then((records)=>{
                                  res.status(200).send({success:true,data:records})
                                })
                                .catch((error)=>{
                                  res.status(500).send({success:false,"message":"something went wrong please try again"})
                                })
                              })
    }else{
      res.status(401).send({success:false,message:"You are not authorized to visit this route"})
  }
} catch (error) {
    res.status(400).json({success:false,"message":"something went wrong please try again"})
    
  }
}

recordDownload = async(req,res)=>{
  try {
    if (req.jwt.role==="superuser") {
      let  query= {}
      for (const key in req.query){
        if (req.query[key]){
          query[key]=req.query[key]
        }
      }
      data = await recordModel.find(query,{_id:0,__v:0})
      f=[]
      data.forEach(element => {
        f.push({id:element['id'],firstName:element['firstName'],lastName:element['lastName'],Branch:element['Branch'],passOutYear:element['passOutYear'],cName:element['cName']})
      });
      const json2csvParser = new json2csv({ header: true });
      const csvData = json2csvParser.parse(f);
      // console.log(csvData);
      fs.writeFileSync(appRoot+"/uploads/users.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write to fs.csv successfully!");
      });
      res.status(200).download(appRoot+"/uploads/users.csv","data.csv")
      fs.rm(appRoot+"/uploads/users.csv",(err)=>{console.log(err);})
    } else {
      res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
    }
  } catch (error) {
    res.status(400).json({success:false,"message":"something went wrong please try again",error:'error'})
  }
}


recordList = async(req,res)=>{
  try {
      let  query= {}
      for (const key in req.query){
        if (req.query[key]){
          query[key]=req.query[key]
        }
      }
      recordModel.find(query)
                  .then((data)=>{
                              res.status(200).send({success: true,data:data})   
                          })
                          .catch((error)=>{
                               res.status(503).send({success: false,message:"somting went worng please try again"})
                          })
  } catch (error) {
    console.log(error);
       res.status(500).send({success:false,message:"somting went worng please try again"})
  }
}


distinctYear = async(req,res)=>{
  try {
    recordModel.distinct('passOutYear')
                      .then((data)=>{
                        res.status(200).send({success: true,data:data}) 
                      })
                      .catch((error)=>{
                        res.status(500).send({success:flase,message:"somting went worng please try again"})
                      })
  } catch (error) {
    res.status(500).send({success:flase,message:"somting went worng please try again"})
  }
  }

distinctBranch = async(req,res)=>{
  try {
    recordModel.distinct('Branch')
                      .then((data)=>{
                        res.status(200).send({success: true,data:data}) 
                      })
                      .catch((error)=>{
                        res.status(500).send({success:flase,message:"somting went worng please try again"})
                      })
  } catch (error) {
    res.status(500).send({success:flase,message:"somting went worng please try again"})
  }
  }

distinctcName= async(req,res)=>{
  try {
    recordModel.distinct('cName')
                      .then((data)=>{
                        res.status(200).send({success: true,data:data}) 
                      })
                      .catch((error)=>{
                        res.status(500).send({success:flase,message:"somting went worng please try again"})
                      })
  } catch (error) {
    res.status(500).send({success:flase,message:"somting went worng please try again"})
  }
  }

module.exports.createRecord =createRecord
module.exports.download =recordDownload
module.exports.recordList =recordList
module.exports.distinctYear =distinctYear
module.exports.distinctBranch =distinctBranch
module.exports.distinctcName =distinctcName