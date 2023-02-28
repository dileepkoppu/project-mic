const appRoot =require("app-root-path");

const examModel = require(appRoot+"/models/examModel.js")
const examSModel = require(appRoot+"/models/examSModel.js")
const questionModel = require(appRoot+"/models/questionModel.js")
const {validation_e} = require(appRoot+'/apps/v1/common/utils/examSchema_validation.js');


const createExam=async(req,res)=>{
    try {
        console.log(req.body);
        if (req.jwt.role==='superuser'){
            let data={
                "title":req.body.title,
                "cName":req.body.cName,
                "imgLink":req.body.imgLink,
                "description":req.body.description,
                "totalNoOfQ":req.body.totalNoOfQ 
            }
            validate=validation_e(data)
            console.log('@@@@@@@@@@@@@@@@@@@@@');
            if (validate) {
                const exam = new examModel(data)
                const examSave =await exam.save()
                res.status(201).send({success:true,"message":"Exam successfully created"})
            } else {
                res.status(422).send({success:false,"message":"Please provide vaild data"})
            }
        } else {
            res.status(401).send({success:false,message:"You are not authorized to visit this route"})   
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,"message":"something went wrong please try again"}) 
    }
}


const deleteExam=async(req,res)=>{
    try {
        if (req.jwt.role==='superuser'){
            let id= req.params.id
            let data1 = await examModel.find({ "_id": { $ne: id }})
            examModel.deleteOne({"_id":id})
                                .then((data_temp)=>{
                                    // data=examModel.find()
                                    if (data_temp.deletedCount===1) {
                                        questionModel.deleteMany({exam_id:id})
                                         res.status(203).send({success:true,data:data1})
                                    } else {
                                         res.status(304).send({success:flase,"message":"exam not deleted please try again"})
                                    }
                                })
                                .catch((error)=>{
                                    console.log(error);
                                     res.status(500).send({success:false,"message":"something when wrong please try again"})
                                })
            
        } else {
            res.status(403).send({success: false,"message":"You are not authorized to visit this route"})
        }
    } catch (error) {
        res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}


const startExam=async(req,res)=>{
    try {
        id=req.params.id
        let question_id=await questionModel.find({"exam_id":id},{_id:1})
        let count =question_id.length
        let exam_details= await examModel.findOne({"_id":id})
        if (exam_details.totalNoOfQ<=count) {
            let data_temp={
                "title":exam_details.title,
                "name":req.body.name,
                "cName":exam_details.cName,
                "exam_id":id,
                "q_list":question_id.map(x=>x['_id']).slice(0,exam_details.totalNoOfQ),
                "score":0,
                "totalNoOfQ":exam_details.totalNoOfQ
            }
            let q_c=data_temp['q_list'].pop()
            console.log(q_c,data_temp['q_list']);
            const examS = new examSModel(data_temp)
            const exam =await examS.save()
            res.status(200).send({success:true,data:{id:exam._id,q_c:q_c,q_n:data_temp.q_list[data_temp.q_list.length-1]}})
        } else {
            res.status(400).send({success:false})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}

const examDetails=async(req,res)=>{
    try {
        id =req.params.id
        examModel.findOne({"_id":id},{_id:1,description:1})
                                .then((data_temp)=>{
                                    res.status(203).send({success:true,data:data_temp})
                                }).catch((error)=>{
                                    console.log(error);
                                     res.status(422).send({success:false})
                                })
    } catch (error) {
        res.status(400).json({success:false,"message":"something went wrong please try again"}) 
    }
} 



const examList = async(req,res)=>{
    try {
        examModel.find()
                    .then((data)=>{
                        res.status(200).json({success:true,data:data})
                    })
                    .catch((error)=>{
                        res.status(500).send({success:false,"message":"something when wrong please try again"})
                    })
    } catch (error) {
        res.status(500).send({success:false,"message":"something when wrong please try again"})
    }
}

const resultExam = async(req,res)=>{
    try {
        let id=req.params.exam_session
        examSModel.findOne({_id:id},{_id:1,exam_id:1,score:1,totalNoOfQ:1})
                    .then((data)=>{
                        res.status(200).json({success:true,data:data})
                    })
                    .catch((error)=>{
                        res.status(500).send({success:false,"message":"something when wrong please try again"})
                    })
    } catch (error) {
        res.status(500).send({success:false,"message":"something when wrong please try again"})
    }
}


module.exports.createExam = createExam
module.exports.deleteExam = deleteExam
module.exports.startExam = startExam
module.exports.examDetails = examDetails
module.exports.examList = examList
module.exports.resultExam = resultExam