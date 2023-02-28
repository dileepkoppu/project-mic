const appRoot =require("app-root-path");

const questionModel = require(appRoot+"/models/questionModel.js")
const examSModel = require(appRoot+"/models/examSModel.js")
const {validation_q} = require(appRoot+'/apps/v1/common/utils/questionSchema_validation');


const createQuestion=async(req,res)=>{
    try {
        if (req.jwt.role==='superuser'){
            let data={
                "question":req.body.question,
                "options":[req.body.opt1,req.body.opt2,req.body.opt3,req.body.opt4],
                "Ans":req.body.Ans,
                "exam_id":req.params.id 
            }
            temp=data.options.indexOf(data.Ans)
            validate=validation_q(data)
            console.log(data);
            if (validate && temp>=0) {
                const question = new questionModel(data)
                const questionSave =await question.save()
                res.status(201).send({success:true,"message":"Question successfully created"})
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


const questionDetails=async(req,res)=>{
    try {
        console.log(req.params);
        id =req.params.q_c
        questionModel.findOne({"_id":id},{Ans:0,"__v": 0})
                                .then((data_temp)=>{
                                    res.status(203).send({success:true,data:data_temp})
                                }).catch((error)=>{
                                     res.status(422).send({success:false})
                                })
    } catch (error) {
        res.status(400).json({success:false,"message":"something went wrong please try again"}) 
    }
} 


const checkAns=async(req,res)=>{
    try {
        q_id=req.params.q_c
        e_s=req.params.e_s
        if (q_id && e_s){
            let examSDetails= await examSModel.findOne({_id:e_s})
            let questionDetail= await questionModel.findOne({_id:q_id})
            if (questionDetail.Ans===req.body.opt) {
                examSDetails.score+=1
            }
            let q_c = examSDetails.q_list.pop()
            await examSDetails.save()
            res.status(200).json({success:true,data:{q_c:q_c}})
        } else {
            res.status(400).json({success:false,"message":"something went wrong please"})    
        }
    } catch (error) {
        res.status(500).json({success:false,"message":"something went wrong please try again"}) 
    }

}


module.exports.createQuestion = createQuestion
module.exports.checkAns = checkAns
module.exports.questionDetails =questionDetails