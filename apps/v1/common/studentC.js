const appRoot =require("app-root-path");
const fs = require('fs')


const studentCModel = require(appRoot+"/models/studentCModel.js")
const parse = require('csv-parse').parse
const json2csv = require("json2csv").Parser;

createstudentC= async(req,res)=>{
  try {
    if (req.jwt.role==="superuser" && req.file){
      const file = req.file
      const data = fs.readFileSync(file.path)
      parse(data, async(err, records) => {
        if (err) {
          console.error(err)
          res.status(400).json({success: false, message: 'An error occurred'})
        }
        for (const index in records) {
            let record=records[index]
            dataTemp={
                id:record[0],
                firstName:record[1],
                lastName:record[2],
                Branch:record[3],
                passOutYear:record[4],
                cName:record[5],
                totalRounds:record[6],
                currentRound:record[7],
                status:record[8].toLowerCase()
            }
            await studentCModel.updateOne({id:dataTemp.id,cName:dataTemp.cName},{$set:dataTemp},{upsert:true})
        }
        data_temp =await studentCModel.find()
        res.status(200).send({success:true,data:data_temp})
        fs.rmSync(file.path)
        })
    }else{
      res.status(401).send({success:false,message:"You are not authorized to visit this route"})
  }
} catch (error) {
    res.status(400).json({success:false,"message":"something went wrong please try again"})
    
  }
}

studentCDownload = async(req,res)=>{
  try {
    if (req.jwt.role==="superuser") {
      query={}
      for (const key in req.query){
        if (req.query[key]){
          query[key]=req.query[key]
        }
      }
      data = await studentCModel.find(query,{_id:0,__v:0})
      f=[]
      data.forEach(element => {
        f.push({id:element['id'],firstName:element['firstName'],lastName:element['lastName'],Branch:element['Branch'],passOutYear:element['passOutYear'],cName:element['cName'],totalRounds:element['totalRounds'],currentRound:element['currentRound'],status:element['status']})
      });
      const json2csvParser = new json2csv({ header: true });
      const csvData = json2csvParser.parse(f);
      fs.writeFileSync(appRoot+"/uploads/users.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write to fs.csv successfully!");
      });
      res.download(appRoot+"/uploads/users.csv","data.csv")
      fs.rm(appRoot+"/uploads/users.csv",(err)=>{console.log(err);})
    } else {
      res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
    }
  } catch (error) {
    res.status(400).json({success:false,"message":"something went wrong please try again"})
  }
}

studentCList = async(req,res)=>{
  try {
      query={}
      for (const key in req.query){
        if (req.query[key]){
          query[key]=req.query[key]
        }
      }
      studentCModel.find(query)
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
distinctYear = async(req,res)=>{
  try {
    studentCModel.distinct('passOutYear')
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
    studentCModel.distinct('Branch')
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
    studentCModel.distinct('cName')
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


module.exports.createstudentC =createstudentC
module.exports.studentC_download =studentCDownload
module.exports.studentC_List =studentCList
module.exports.studentC_distinctYear =distinctYear
module.exports.studentC_distinctBranch =distinctBranch
module.exports.studentC_distinctcName =distinctcName